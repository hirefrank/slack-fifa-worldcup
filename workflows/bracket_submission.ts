import { DefineFunction, DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

// channel for discusing world cup challenge
const discussionChannel = "C04DS0WL2UR"; //C04DS0WL2UR //pde C04CZEF7YBH

// knockout stage teams
const teams = {
  "A1": "Netherlands",
  "A2": "Senegal",
  "B1": "England",
  "B2": "USA",
  "C1": "Argentina",
  "C2": "Poland",
  "D1": "France",
  "D2": "Australia",
  "E1": "Japan",
  "E2": "Spain",
  "F1": "Morocco",
  "F2": "Croatia",
  "G1": "Brazil",
  "G2": "Switzerland",
  "H1": "Portugal",
  "H2": "South Korea",
};

export const saveBracketToDatastore = DefineFunction({
  callback_id: "save_bracket",
  title: "Save bracket to datastore",
  description: "Save bracket to datastore",
  source_file: "functions/save_bracket.ts",
  input_parameters: {
    properties: {
      participant: {
        type: Schema.slack.types.user_id,
      },
      bracket: {
        type: Schema.types.string,
      },
    },
    required: [
      "participant",
      "bracket",
    ],
  },
});

export const BracketWorkflow = DefineWorkflow({
  callback_id: "bracket_workflow",
  title: "World Cup Challenge Bracket",
  description:
    "Submit your backet before the knockout stage begins Saturday morning.",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      participant: {
        type: Schema.slack.types.user_id,
      },
    },
    required: [
      "interactivity",
      "participant",
    ],
  },
});

const inputFormStep = BracketWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Submit your picks!",
    interactivity: BracketWorkflow.inputs.interactivity,
    fields: {
      elements: [
        {
          name: "match_1",
          title: "Match 1",
          type: Schema.types.string,
          default: `${teams.A1} vs ${teams.B2}`,
        },
        {
          name: "match_2",
          title: "Match 2",
          type: Schema.types.string,
          default: `${teams.C1} vs ${teams.D2}`,
        },
        {
          name: "match_3",
          title: "Match 3",
          type: Schema.types.string,
          default: `${teams.D1} vs ${teams.C2}`,
        },
        {
          name: "match_4",
          title: "Match 4",
          type: Schema.types.string,
          default: `${teams.B1} vs ${teams.A2}`,
        },
        {
          name: "match_5",
          title: "Match 5",
          type: Schema.types.string,
          default: `${teams.E1} vs ${teams.F2}`,
        },
        {
          name: "match_6",
          title: "Match 6",
          type: Schema.types.string,
          default: `${teams.G1} vs ${teams.H2}`,
        },
        {
          name: "match_7",
          title: "Match 7",
          type: Schema.types.string,
          default: `${teams.F1} vs ${teams.E2}`,
        },
        {
          name: "match_8",
          title: "Match 8",
          type: Schema.types.string,
          default: `${teams.H1} vs ${teams.G2}`,
        },
        {
          name: "quaterfinal_1",
          title: "Quarterfinal 1",
          type: Schema.types.string,
          default: "Winners of Match 1 vs 2",
        },
        {
          name: "quaterfinal_2",
          title: "Quarterfinal 2",
          type: Schema.types.string,
          default: "Winners of Match 5 vs 6",
        },
        {
          name: "quaterfinal_3",
          title: "Quarterfinal 3",
          type: Schema.types.string,
          default: "Winners of Match 3 vs 4",
        },
        {
          name: "quaterfinal_4",
          title: "Quarterfinal 4",
          type: Schema.types.string,
          default: "Winners of Match 7 vs 8",
        },
        {
          name: "semifinal_1",
          title: "Semifinal 1",
          type: Schema.types.string,
          default: "Winners of QF 1 vs 2",
        },
        {
          name: "semifinal_2",
          title: "Semifinal 2",
          type: Schema.types.string,
          default: "Winners of QF 3 vs 4",
        },
        {
          name: "third_place",
          title: "Third place",
          type: Schema.types.string,
          default: "Losers of SF 1 vs 2",
        },
        {
          name: "championship",
          title: "Championship",
          type: Schema.types.string,
          default: "Winners of SF 1 vs 2",
        },
      ],
      required: [
        "match_1",
        "match_2",
        "match_3",
        "match_4",
        "match_5",
        "match_6",
        "match_7",
        "match_8",
        "quaterfinal_1",
        "quaterfinal_2",
        "quaterfinal_3",
        "quaterfinal_4",
        "semifinal_1",
        "semifinal_2",
        "third_place",
        "championship",
      ],
    },
  },
);

BracketWorkflow.addStep(
  saveBracketToDatastore,
  {
    participant: BracketWorkflow.inputs.participant,
    bracket:
      `${inputFormStep.outputs.fields.match_1}-${inputFormStep.outputs.fields.match_2}-${inputFormStep.outputs.fields.match_3}-${inputFormStep.outputs.fields.match_4}-${inputFormStep.outputs.fields.match_5}-${inputFormStep.outputs.fields.match_6}-${inputFormStep.outputs.fields.match_7}-${inputFormStep.outputs.fields.match_8}-${inputFormStep.outputs.fields.quaterfinal_1}-${inputFormStep.outputs.fields.quaterfinal_2}-${inputFormStep.outputs.fields.quaterfinal_3}-${inputFormStep.outputs.fields.quaterfinal_4}-${inputFormStep.outputs.fields.semifinal_1}-${inputFormStep.outputs.fields.semifinal_2}-${inputFormStep.outputs.fields.third_place}-${inputFormStep.outputs.fields.championship}`,
  },
);

BracketWorkflow.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: discussionChannel,
    message:
      `:check_green: :bracket: <@${BracketWorkflow.inputs.participant}> has submitted their bracket.`,
  },
);
