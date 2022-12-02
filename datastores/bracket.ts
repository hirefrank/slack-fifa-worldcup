import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

export const BracketStore = DefineDatastore({
  name: "brackets",
  primary_key: "id",
  attributes: {
    id: {
      type: Schema.types.string,
    },
    participant: {
      type: Schema.slack.types.user_id,
    },
    bracket: {
      type: Schema.types.string,
    },
  },
});
