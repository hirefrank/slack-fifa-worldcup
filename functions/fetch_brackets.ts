import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { fetchBrackets } from "../workflows/show_brackets.ts";

export default SlackFunction(fetchBrackets, async ({ client }) => {
  const result = await client.apps.datastore.query({
    datastore: "brackets",
  });

  let message =
    `*Winners: M1, M2, M3, M4, M5, M6, M7, M8, QF1, QF2, QF3, QF4, SF1, SF2, 3P, Finals* \n`;

  result.items.forEach((item) => {
    console.log(`${item.participant}-${item.bracket}`);
    // const re = /-/g;
    // const itemFormatted = item.bracket.replace(re, ", ");
    // message = message.concat(
    //   `<@${item.participant}>, ${itemFormatted} \n`,
    // );
  });

  return { outputs: { message } };
});
