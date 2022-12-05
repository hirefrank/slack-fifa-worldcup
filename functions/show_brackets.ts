import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { saveBracketToDatastore } from "../workflows/bracket_submission.ts";

export default SlackFunction(
  saveBracketToDatastore,
  async ({ inputs, client }) => {
    const putResponse = await client.apps.datastore.put({
      datastore: "brackets",
      item: {
        id: crypto.randomUUID(),
        participant: inputs.participant,
        bracket: inputs.bracket,
      },
    });

    console.log(putResponse);

    if (!putResponse.ok) {
      console.log("Error calling apps.datastore.put:");
      console.log(putResponse);
    }

    return {
      outputs: putResponse,
    };
  },
);
