import { Trigger } from "deno-slack-api/types.ts";
import JoinWCChallengeWorkflow from "../workflows/join_wcc_workflow.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const linkTrigger: Trigger<typeof JoinWCChallengeWorkflow.definition> = {
  type: "shortcut",
  name: "2022 FIFA World Cup Challenge",
  description: "Pick the winners of the knockout stage & predict who will come out on top in the 2022 FIFA World Cup.",            
  workflow: "#/workflows/join_wcc_workflow",
  inputs: {
    participant: {
      value: "{{data.user_id}}",
    },
    fromChannel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default linkTrigger;
