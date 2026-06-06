import assert from "node:assert/strict";
import { handleSeraVNextCandidateRequest } from "../../frontend/src/app/api/admin/sera-vnext/candidate/route";
import { analyzeSeraVNextCandidateOnly } from "../../frontend/src/lib/sera-vnext-runtime";
import type { ApiUserContext } from "../../frontend/src/lib/server/api-auth";

const adminUser: ApiUserContext = {
  userId: "a4r225-admin",
  email: "admin@example.test",
  tenantId: "tenant-enterprise-a4r225",
  role: "admin",
  accessToken: "must-not-be-logged",
};

const candidateNarrative =
  "During the night approach, the crew noticed unstable indications and descended below the intended glide path. The captain decided to continue the approach despite the warning. Seconds later the aircraft struck runway lights and sustained damage.";

async function main() {
  const direct = analyzeSeraVNextCandidateOnly({
    input: { eventText: candidateNarrative, clientRequestId: "direct-run" },
    requestId: "candidate-direct",
  });
  const directRepeat = analyzeSeraVNextCandidateOnly({
    input: { eventText: candidateNarrative, clientRequestId: "direct-run-repeat" },
    requestId: "candidate-direct",
  });

  assert.deepEqual(directRepeat, direct, "direct candidate service must be deterministic for equal input and requestId");
  assert.equal(direct.mode, "CANDIDATE_ONLY_NON_FINAL");
  assert.equal(direct.analysisStatus, "CANDIDATE_ONLY");
  assert.equal(direct.canonicalTreeStatus, "REAL_TREE_MISSING");
  assert.equal(direct.selectedCode, null);
  assert.equal(direct.releasedCode, null);
  assert.equal(direct.finalConclusion, null);
  assert.equal(direct.classifiedOutput, false);
  assert.equal(direct.readyPromotion, false);
  assert.equal(direct.downstreamAllowed, false);
  assert.equal(direct.persisted, false);
  assert.ok(direct.facts.length >= 3, "factual extraction expected");
  assert.ok(direct.timeline.length >= 3, "timeline expected");
  assert.ok(direct.reasoningLanes.perception.length >= 1, "perception lane expected");
  assert.ok(direct.reasoningLanes.objective.length >= 1, "objective lane expected");
  assert.ok(direct.reasoningLanes.action.length >= 1, "action lane expected");
  assert.ok(direct.escapePointCandidate.supportingEvidence.length >= 1, "escape window evidence expected");
  assert.equal(
    direct.escapePointCandidate.latestCandidate?.includes("struck runway lights") ?? false,
    false,
    "escape window must not use consequence as causal window boundary",
  );

  const events: Array<Record<string, unknown>> = [];
  const request = new Request("http://localhost/api/admin/sera-vnext/candidate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-request-id": "candidate-route-ok",
    },
    body: JSON.stringify({
      eventText: candidateNarrative,
      clientRequestId: "client-ok",
    }),
  });

  const response = await handleSeraVNextCandidateRequest(request, {
    requireAdminUser: async () => adminUser,
    isReadOnlyEnabled: () => true,
    isInternalPilotEnabled: () => true,
    isCandidateOnlyEnabled: () => true,
    logEvent: (event) => events.push(event),
    requestId: () => "candidate-route-ok",
    now: (() => {
      let current = 1000;
      return () => {
        current += 5;
        return current;
      };
    })(),
  });

  assert.equal(response.status, 200);
  const payload = (await response.json()) as Awaited<ReturnType<typeof analyzeSeraVNextCandidateOnly>>;
  assert.equal(payload.requestId, "candidate-route-ok");
  assert.equal(payload.analysisStatus, "CANDIDATE_ONLY");
  assert.equal(payload.canonicalTreeStatus, "REAL_TREE_MISSING");
  assert.equal(payload.persisted, false);
  assert.equal(payload.readyPromotion, false);
  assert.equal(payload.downstreamAllowed, false);
  assert.equal(payload.selectedCode, null);
  assert.equal(payload.releasedCode, null);
  assert.equal(payload.finalConclusion, null);
  assert.ok(payload.warnings.includes("NON_FINAL_OUTPUT_ONLY"));
  assert.ok(payload.warnings.includes("REAL_TREE_MISSING"));
  assert.ok(payload.uncertainties.some((item) => item.includes("Canonical SERA tree traversal")));

  const eventsText = JSON.stringify(events);
  assert.ok(events.some((event) => event.event === "sera_vnext_candidate_assessment_requested"));
  assert.ok(events.some((event) => event.event === "sera_vnext_candidate_assessment_completed"));
  for (const forbidden of ["must-not-be-logged", candidateNarrative, "Bearer", "cookie", "selectedCode"]) {
    assert.equal(eventsText.includes(forbidden), false, `forbidden content must not be logged: ${forbidden}`);
  }

  console.log("PRODUCT_ALPHA_CANDIDATE_ONLY_OK");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
