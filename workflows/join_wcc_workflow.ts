import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { saveParticipantToDatastore } from "../functions/save_participant.ts";

// channel for discusing world cup challenge
const discussionChannel = "C04DS0WL2UR";

const JoinWCChallengeWorkflow = DefineWorkflow({
  callback_id: "join_wcc_workflow",
  title: "2022 FIFA World Cup Challenge",
  description:
    "Pick the winners of the knockout stage & predict who will come out on top in the 2022 FIFA World Cup.",
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

const saveParticipant = JoinWCChallengeWorkflow.addStep(
  saveParticipantToDatastore,
  {
    id: crypto.randomUUID(),
    participant: JoinWCChallengeWorkflow.inputs.participant,
    fromChannel: JoinWCChallengeWorkflow.inputs.fromChannel,
  },
);

JoinWCChallengeWorkflow.addStep(
  Schema.slack.functions.InviteUserToChannel,
  {
    channel_id: discussionChannel,
    user_id: saveParticipant.outputs.participant,
  },
);

JoinWCChallengeWorkflow.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: discussionChannel,
    message:
      `:wave: :soccer: Welcome ${saveParticipant.outputs.participant} to the pitch!`,
  },
);

export default JoinWCChallengeWorkflow;
