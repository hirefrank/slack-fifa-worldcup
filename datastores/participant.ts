import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

export const ParticipantStore = DefineDatastore({
  name: "wcc_participants",
  primary_key: "id",
  attributes: {
    id: {
      type: Schema.types.string,
    },
    participant: {
      type: Schema.slack.types.user_id,
    },
    fromChannel: {
      type: Schema.slack.types.channel_id,
    },
  },
});
