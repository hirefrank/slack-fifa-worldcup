import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const saveParticipantToDatastore = DefineFunction({
  callback_id: "save_participant",
  title: "Save participant info to datastore",
  description: "Save participant info to datastore",
  source_file: "functions/save_participant.ts",
  input_parameters: {
    properties: {
      participant: {
        type: Schema.slack.types.user_id,
      },
      fromChannel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: [
      "participant",
      "fromChannel",
    ],
  },
});

export default SlackFunction(
  saveParticipantToDatastore,
  async ({ inputs, client }) => {
    const putResponse = await client.apps.datastore.put({
      datastore: "wcc_participants",
      item: {
        id: crypto.randomUUID(),
        participant: inputs.participant,
        fromChannel: inputs.fromChannel,
      },
    });

    if (!putResponse.ok) {
      console.log("Error calling apps.datastore.put:");
      console.log(putResponse);
    }

    return {
      outputs: putResponse,
    };
  },
);
