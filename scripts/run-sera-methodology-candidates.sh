#!/usr/bin/env bash
set -euo pipefail

# SERA Methodology Candidates Runner (A2-d)
#
# Safety goals:
# - Never touch tests/sera/fixtures in the real repo.
# - Never touch tests/reports/baseline.
# - Run candidate fixtures only via a temporary copy outside the repo.

print_usage() {
  cat <<'USAGE'
Uso:
  scripts/run-sera-methodology-candidates.sh --check-only
  scripts/run-sera-methodology-candidates.sh --run

Env vars:
  SERA_FIXTURE_LIST        default: tests/sera/methodology-gate-fixtures.txt
  SERA_CANDIDATE_ROOT      default: tests/sera/fixtures-candidates
  SERA_CANDIDATE_TRACK     default: methodology-gate
  SERA_N_RUNS              default: 1
  SERA_ALLOW_MULTI_RUN     default: 0 (set 1 to allow SERA_N_RUNS>1)
USAGE
}

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

MODE=""
for arg in "$@"; do
  case "$arg" in
    --check-only)
      if [ -n "$MODE" ]; then
        echo "ERRO: flags conflitantes"
        print_usage
        exit 2
      fi
      MODE="check"
      ;;
    --run)
      if [ -n "$MODE" ]; then
        echo "ERRO: flags conflitantes"
        print_usage
        exit 2
      fi
      MODE="run"
      ;;
    *)
      print_usage
      exit 2
      ;;
  esac
done

if [ -z "$MODE" ]; then
  print_usage
  exit 2
fi

SERA_FIXTURE_LIST="${SERA_FIXTURE_LIST:-tests/sera/methodology-gate-fixtures.txt}"
SERA_CANDIDATE_ROOT="${SERA_CANDIDATE_ROOT:-tests/sera/fixtures-candidates}"
SERA_CANDIDATE_TRACK="${SERA_CANDIDATE_TRACK:-methodology-gate}"
SERA_N_RUNS="${SERA_N_RUNS:-1}"
SERA_ALLOW_MULTI_RUN="${SERA_ALLOW_MULTI_RUN:-0}"

TRACK_DIR="$SERA_CANDIDATE_ROOT/$SERA_CANDIDATE_TRACK"
REPORTS_CANDIDATES_DIR="tests/reports/candidates"
TMP_WORK_DIR=""

snapshot_official_fixtures() {
  if [ ! -d tests/sera/fixtures ]; then
    echo "MISSING_DIR"
    return
  fi
  find tests/sera/fixtures -type f | LC_ALL=C sort | while IFS= read -r f; do
    shasum -a 256 "$f"
  done | shasum -a 256 | awk '{print $1}'
}

validate_common() {
  if [ ! -f "$SERA_FIXTURE_LIST" ]; then
    echo "ERRO: lista nao encontrada: $SERA_FIXTURE_LIST"
    exit 1
  fi

  if [ ! -d "$SERA_CANDIDATE_ROOT" ]; then
    echo "ERRO: candidate root nao encontrado: $SERA_CANDIDATE_ROOT"
    exit 1
  fi

  if [ ! -d "$TRACK_DIR" ]; then
    echo "ERRO: track nao encontrada: $TRACK_DIR"
    exit 1
  fi

  IDS=()
  while IFS= read -r line; do
    case "$line" in
      ''|'#'*) continue ;;
      *) IDS+=("$line") ;;
    esac
  done < "$SERA_FIXTURE_LIST"

  ID_COUNT="${#IDS[@]}"
  if [ "$ID_COUNT" -eq 0 ]; then
    echo "ERRO: lista vazia: $SERA_FIXTURE_LIST"
    exit 1
  fi

  JSON_TOTAL="$(find "$SERA_CANDIDATE_ROOT" -type f -name '*.json' | wc -l | tr -d ' ')"
  JSON_TRACK="$(find "$TRACK_DIR" -type f -name '*.json' | wc -l | tr -d ' ')"

  FOUND=0
  MISSING=0
  MISSING_IDS=()
  for id in "${IDS[@]}"; do
    if [ -f "$TRACK_DIR/$id.json" ]; then
      FOUND=$((FOUND + 1))
    else
      MISSING=$((MISSING + 1))
      MISSING_IDS+=("$id")
    fi
  done

  echo "SERA methodology candidates check"
  echo "list: $SERA_FIXTURE_LIST"
  echo "track: $SERA_CANDIDATE_TRACK"
  echo "candidate root: $SERA_CANDIDATE_ROOT"
  echo "n-runs: $SERA_N_RUNS"
  echo "ids: $ID_COUNT"
  echo "json files found: $JSON_TOTAL"
  echo "json files in track: $JSON_TRACK"
  echo "ids with json: $FOUND"
  echo "ids without json: $MISSING"
}

validate_json_for_ids() {
  for id in "${IDS[@]}"; do
    local fp="$TRACK_DIR/$id.json"
    node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$fp" >/dev/null
  done
}

assert_n_runs_policy() {
  if ! [[ "$SERA_N_RUNS" =~ ^[0-9]+$ ]]; then
    echo "ERRO: SERA_N_RUNS invalido: $SERA_N_RUNS"
    exit 1
  fi

  if [ "$SERA_N_RUNS" -le 0 ]; then
    echo "ERRO: SERA_N_RUNS deve ser > 0"
    exit 1
  fi

  if [ "$SERA_N_RUNS" -gt 1 ] && [ "$SERA_ALLOW_MULTI_RUN" != "1" ]; then
    echo "ERRO: SERA_N_RUNS>1 bloqueado. Use SERA_ALLOW_MULTI_RUN=1 para habilitar explicitamente."
    exit 1
  fi
}

run_candidates() {
  local before_hash after_hash runner_status report_tmp report_dest run_tsx run_cmd

  assert_n_runs_policy

  if [ "$JSON_TRACK" -eq 0 ]; then
    echo "ERRO: track sem JSONs: $TRACK_DIR"
    exit 1
  fi

  if [ "$MISSING" -gt 0 ]; then
    echo "ERRO: IDs sem JSON na track selecionada:"
    for id in "${MISSING_IDS[@]}"; do
      echo "  - $id"
    done
    exit 1
  fi

  validate_json_for_ids

  before_hash="$(snapshot_official_fixtures)"

  TMP_WORK_DIR="$(mktemp -d /tmp/hfa-sera-methodology-candidates-XXXXXX)"
  cleanup() {
    if [ -n "${TMP_WORK_DIR:-}" ] && [ -d "$TMP_WORK_DIR" ]; then
      rm -rf "$TMP_WORK_DIR"
    fi
  }
  trap cleanup EXIT

  echo "temp dir: $TMP_WORK_DIR"

  # Copy only the minimal execution surface needed by tests/sera runner.
  mkdir -p "$TMP_WORK_DIR/tests" "$TMP_WORK_DIR/frontend" "$TMP_WORK_DIR/tests/reports"
  rsync -a "$REPO_ROOT/tests/sera" "$TMP_WORK_DIR/tests/"
  rsync -a "$REPO_ROOT/frontend/src" "$TMP_WORK_DIR/frontend/"

  if [ -f "$REPO_ROOT/tsconfig.json" ]; then
    cp "$REPO_ROOT/tsconfig.json" "$TMP_WORK_DIR/tsconfig.json"
  fi
  if [ -f "$REPO_ROOT/frontend/tsconfig.json" ]; then
    cp "$REPO_ROOT/frontend/tsconfig.json" "$TMP_WORK_DIR/frontend/tsconfig.json"
  fi
  if [ -f "$REPO_ROOT/.env.test" ]; then
    cp "$REPO_ROOT/.env.test" "$TMP_WORK_DIR/.env.test"
  fi
  if [ -f "$REPO_ROOT/frontend/.env.test" ]; then
    cp "$REPO_ROOT/frontend/.env.test" "$TMP_WORK_DIR/frontend/.env.test"
  fi

  if [ -d "$REPO_ROOT/frontend/node_modules" ]; then
    mkdir -p "$TMP_WORK_DIR/frontend"
    ln -s "$REPO_ROOT/frontend/node_modules" "$TMP_WORK_DIR/frontend/node_modules"
  fi

  rm -rf "$TMP_WORK_DIR/tests/sera/fixtures"
  mkdir -p "$TMP_WORK_DIR/tests/sera/fixtures"

  for id in "${IDS[@]}"; do
    cp "$TRACK_DIR/$id.json" "$TMP_WORK_DIR/tests/sera/fixtures/$id.json"
  done

  run_tsx="$TMP_WORK_DIR/frontend/node_modules/.bin/tsx"
  if [ -x "$run_tsx" ]; then
    run_cmd="$run_tsx tests/sera/run.ts --compact"
  else
    run_cmd="npx tsx tests/sera/run.ts --compact"
  fi

  echo "command: SERA_N_RUNS=$SERA_N_RUNS $run_cmd"

  set +e
  (
    cd "$TMP_WORK_DIR"
    SERA_N_RUNS="$SERA_N_RUNS" sh -c "$run_cmd"
  )
  runner_status=$?
  set -e

  mkdir -p "$REPORTS_CANDIDATES_DIR"

  report_tmp="$(ls -t "$TMP_WORK_DIR"/tests/reports/run-*.json 2>/dev/null | head -1 || true)"
  report_dest=""
  if [ -n "$report_tmp" ] && [ -f "$report_tmp" ]; then
    report_dest="$REPORTS_CANDIDATES_DIR/methodology-gate-run-$(date +%s).json"
    cp "$report_tmp" "$report_dest"
    echo "report path: $report_dest"
  else
    echo "report path: <not generated>"
  fi

  after_hash="$(snapshot_official_fixtures)"
  if [ "$before_hash" != "$after_hash" ]; then
    echo "ERRO: official fixtures hash changed in real repo"
    exit 1
  fi

  if git diff --name-only | grep -q '^tests/sera/fixtures/'; then
    echo "ERRO: official fixtures changed in real repo"
    exit 1
  fi

  if git diff --name-only | grep -q '^tests/reports/baseline/'; then
    echo "ERRO: baseline changed in real repo"
    exit 1
  fi

  echo "exit status: $runner_status"
  return "$runner_status"
}

validate_common

if [ "$MODE" = "check" ]; then
  echo "status: OK"
  exit 0
fi

run_candidates
