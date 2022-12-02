import { DefineFunction, DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

// channel for discusing world cup challenge
const discussionChannel = "C04CZEF7YBH";

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

export const JoinWCChallengeWorkflow = DefineWorkflow({
  callback_id: "join_wcc_workflow",
  title: "World Cup Challenge",
  description:
    "Join and we'll send you a bracket to fill out after the group stage ends Friday afternoon.",
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

JoinWCChallengeWorkflow.addStep(
  saveParticipantToDatastore,
  {
    participant: JoinWCChallengeWorkflow.inputs.participant,
    fromChannel: JoinWCChallengeWorkflow.inputs.fromChannel,
  },
);

JoinWCChallengeWorkflow.addStep(
  Schema.slack.functions.InviteUserToChannel,
  {
    channel_id: discussionChannel,
    user_id: JoinWCChallengeWorkflow.inputs.participant,
  },
);

JoinWCChallengeWorkflow.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: discussionChannel,
    message:
      `:wave: :soccer: Welcome <@${JoinWCChallengeWorkflow.inputs.participant}> to the pitch!`,
  },
);
