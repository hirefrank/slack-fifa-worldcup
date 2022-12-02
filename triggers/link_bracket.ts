import { Trigger } from "deno-slack-api/types.ts";
import { BracketWorkflow } from "../workflows/bracket_submission.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const linkTrigger: Trigger<typeof BracketWorkflow.definition> = {
  type: "shortcut",
  name: "World Cup Challenge",
  description:
    "Submit your backet before the knockout stage begins Saturday morning.",
  workflow: "#/workflows/bracket_workflow",
  inputs: {
    participant: {
      value: "{{data.user_id}}",
    },
    interactivity: {
      value: "{{data.interactivity}}",
    },
  },
};

export default linkTrigger;
