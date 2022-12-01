import { Manifest } from "deno-slack-sdk/mod.ts";
import { JoinWCChallengeWorkflow } from "./workflows/join_wcc_workflow.ts";
import { ParticipantStore } from "./datastores/participant.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "2022 FIFA World Cup Challenge",
  description:
    "Pick the winners of the knockout stage & predict who will come out on top.",
  icon: "assets/fifa-512.png",
  workflows: [JoinWCChallengeWorkflow],
  datastores: [ParticipantStore],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "pins:write",
    "channels:manage",
    "groups:write",
    "datastore:read",
    "datastore:write",
  ],
});
