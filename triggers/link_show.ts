import { Trigger } from "deno-slack-api/types.ts";
import { fetchBrackets } from "../workflows/show_brackets.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const linkTrigger: Trigger<typeof fetchBrackets.definition> = {
  type: "shortcut",
  name: "World Cup Challenge",
  description:
    "Show everyone's backets for the knockout stage begins Saturday morning.",
  workflow: "#/workflows/show_brackets",
};

export default linkTrigger;
