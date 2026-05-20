#!/usr/bin/env bash
set -euo pipefail

# SERA Methodology Candidates Runner (A2-b)
#
# Fase atual: infraestrutura de isolamento.
# - NÃO copia arquivos para tests/sera/fixtures.
# - NÃO altera baseline.
# - NÃO executa o runner oficial no modo normal nesta fase.
#
# A execução real dos candidates será habilitada em fase posterior (A2-c),
# após a materialização controlada dos JSONs e decisão final de estratégia.

CHECK_ONLY=0

for arg in "$@"; do
  case "$arg" in
    --check-only)
      CHECK_ONLY=1
      ;;
    *)
      echo "Uso: scripts/run-sera-methodology-candidates.sh [--check-only]"
      exit 1
      ;;
  esac
done

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

SERA_FIXTURE_LIST="${SERA_FIXTURE_LIST:-tests/sera/methodology-gate-fixtures.txt}"
SERA_CANDIDATE_ROOT="${SERA_CANDIDATE_ROOT:-tests/sera/fixtures-candidates}"
SERA_N_RUNS="${SERA_N_RUNS:-1}"

derive_track_from_list() {
  local list_name
  list_name="$(basename "$1")"
  case "$list_name" in
    methodology-gate-fixtures.txt) echo "methodology-gate" ;;
    methodology-exploratory-fixtures.txt) echo "methodology-exploratory" ;;
    methodology-negative-fixtures.txt) echo "methodology-negative" ;;
    methodology-multiact-fixtures.txt) echo "methodology-multiact" ;;
    *) echo "methodology-gate" ;;
  esac
}

DEFAULT_TRACK="$(derive_track_from_list "$SERA_FIXTURE_LIST")"
SERA_CANDIDATE_TRACK="${SERA_CANDIDATE_TRACK:-$DEFAULT_TRACK}"
TRACK_DIR="$SERA_CANDIDATE_ROOT/$SERA_CANDIDATE_TRACK"

if [ ! -f "$SERA_FIXTURE_LIST" ]; then
  echo "ERRO: lista não encontrada: $SERA_FIXTURE_LIST"
  exit 1
fi

if [ ! -d "$SERA_CANDIDATE_ROOT" ]; then
  echo "ERRO: candidate root não encontrado: $SERA_CANDIDATE_ROOT"
  exit 1
fi

if [ ! -d "$TRACK_DIR" ]; then
  echo "ERRO: track não encontrada: $TRACK_DIR"
  exit 1
fi

IDS=()
while IFS= read -r line; do
  case "$line" in
    ''|'#'*) continue ;;
  esac
  IDS+=("$line")
done < <(grep -v '^[[:space:]]*#' "$SERA_FIXTURE_LIST" | sed '/^[[:space:]]*$/d')

ID_COUNT="${#IDS[@]}"

JSON_TOTAL="$(find "$SERA_CANDIDATE_ROOT" -type f -name '*.json' | wc -l | tr -d ' ')"
JSON_TRACK="$(find "$TRACK_DIR" -type f -name '*.json' | wc -l | tr -d ' ')"

FOUND=0
MISSING=0
for id in "${IDS[@]}"; do
  if [ -f "$TRACK_DIR/$id.json" ]; then
    FOUND=$((FOUND + 1))
    continue
  fi

  if find "$SERA_CANDIDATE_ROOT" -type f -name "$id.json" | grep -q .; then
    FOUND=$((FOUND + 1))
  else
    MISSING=$((MISSING + 1))
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

if [ "$CHECK_ONLY" -eq 1 ]; then
  echo "status: OK"
  exit 0
fi

if [ "$MISSING" -gt 0 ]; then
  echo "status: BLOCKED"
  echo "Execução real desabilitada nesta fase: há IDs sem JSON materializado."
  echo "Use --check-only durante A2-b. Materialização e execução virão em A2-c."
  exit 2
fi

echo "status: BLOCKED"
echo "Execução real permanece desabilitada em A2-b por decisão de isolamento."
echo "Nenhum candidate foi copiado para tests/sera/fixtures."
exit 2
