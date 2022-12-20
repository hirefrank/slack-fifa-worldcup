import { DefineFunction, DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

// channel for discusing world cup challenge
const discussionChannel = "C04CZEF7YBH"; //C04DS0WL2UR //pde C04CZEF7YBH

export const fetchBrackets = DefineFunction({
  callback_id: "fetch_brackets",
  title: "Get brackets from datastore",
  description: "Get brackets from datastore",
  source_file: "functions/fetch_brackets.ts",
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
      },
    },
    required: ["message"],
  },
});

export const ShowBrackets = DefineWorkflow({
  callback_id: "show_brackets",
  title: "World Cup Challenge Brackets",
  description: "Show everyone's backets for the knockout stage.",
});

const brackets = ShowBrackets.addStep(
  fetchBrackets,
  {},
);

ShowBrackets.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: discussionChannel,
    message: `${brackets.outputs.message}`,
  },
);
