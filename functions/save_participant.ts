import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { saveParticipantToDatastore } from "../workflows/join_wcc_workflow.ts";

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
