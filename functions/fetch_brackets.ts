import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { fetchBrackets } from "../workflows/show_brackets.ts";

export default SlackFunction(fetchBrackets, async ({ client }) => {
  const result = await client.apps.datastore.query({
    datastore: "brackets",
  });

  let message =
    `Parcipant: Slack User ID \n`;

  result.items.forEach((item) => {
    console.log(`${item.participant}-${item.bracket}`);
    message = message.concat(
        `<@${item.participant}>, ${item.participant} \n`,
      );
    // const re = /-/g;
    // const itemFormatted = item.bracket.replace(re, ", ");
    // message = message.concat(
    //   `<@${item.participant}>, ${itemFormatted} \n`,
    // );
  });

  return { outputs: { message } };
});
