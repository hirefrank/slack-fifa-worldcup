import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { fetchBrackets } from "../workflows/show_brackets.ts";

export default SlackFunction(
  fetchBrackets,
  async ({ client }) => {
    const result = await client.apps.datastore.query({
      datastore: "brackets",
    });

    let message =
      `Participant \t | M1 \t | M2 \t | M3 \t | M4 \t | M5 \t | M6 \t | M7 \t | M8 \t | QF1 \t | QF2 \t | QF3 \t | QF4 \t | SF1 \t | SF2 \t | 3P \t | Championship \t \t    \n`;

    result.items.forEach((item) => {
      const re = /-/g;
      const itemFormatted = item.bracket.replace(re, " \t | ");
      message = message.concat(
        `${item.participant} \t | ${itemFormatted}`,
      );
    });

    if (!result.ok) {
      console.log("Error calling apps.datastore.query:");
      console.log(result);
    } else {
      console.log(message);
    }

    return {
      outputs: result,
    };
  },
);
