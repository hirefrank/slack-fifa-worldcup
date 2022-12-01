import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { saveParticipantToDatastore } from "../functions/save_participant.ts";

// channel for discusing world cup challenge
const discussionChannel = "C04CZEF7YBH";

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
