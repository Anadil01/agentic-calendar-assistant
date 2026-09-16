import {
  createPendingAction,
  getPendingAction,
  getUserIdByAuthUserId,
  updatePendingActionStatus,
} from "../repositories/pendingAction.repository.js";
import { cancelMeeting } from "./calendar.service.js";

export async function createCancelApproval(input: {
  authUserId: string;
  eventId: string;
}) {
  const userId = await getUserIdByAuthUserId(input.authUserId);

  if (!userId) {
    throw new Error("User not found");
  }

  return await createPendingAction({
    userId,
    actionType: "cancel_meeting",
    payload: {
      authUserId: input.authUserId,
      eventId: input.eventId,
    },
  });
}

export async function confirmPendingAction(input: {
  authUserId: string;
  actionId: string;
}) {
  const userId = await getUserIdByAuthUserId(input.authUserId);

  if (!userId) {
    throw new Error("User not found");
  }

  const action = await getPendingAction({
    userId,
    actionId: input.actionId,
  });

  if (!action) {
    throw new Error("Pending action not found");
  }

  if (action.status !== "pending") {
    throw new Error(`Action is already ${action.status}`);
  }

  if (new Date(action.expires_at).getTime() <= Date.now()) {
    await updatePendingActionStatus({
      userId,
      actionId: action.id,
      status: "expired",
    });

    throw new Error("Approval has expired");
  }

  if (action.action_type !== "cancel_meeting") {
    throw new Error("Unsupported approval action");
  }

  const payload = action.payload as {
    authUserId?: string;
    eventId?: string;
  };

  if (
    payload.authUserId !== input.authUserId ||
    typeof payload.eventId !== "string" ||
    !payload.eventId
  ) {
    throw new Error("Invalid pending action payload");
  }

  const result = await cancelMeeting({
    authUserId: input.authUserId,
    eventId: payload.eventId,
  });

  await updatePendingActionStatus({
    userId,
    actionId: action.id,
    status: "approved",
  });

  return {
    actionId: action.id,
    actionType: action.action_type,
    result,
  };
}

export async function rejectPendingAction(input: {
  authUserId: string;
  actionId: string;
}) {
  const userId = await getUserIdByAuthUserId(input.authUserId);

  if (!userId) {
    throw new Error("User not found");
  }

  const action = await getPendingAction({
    userId,
    actionId: input.actionId,
  });

  if (!action) {
    throw new Error("Pending action not found");
  }

  if (action.status !== "pending") {
    throw new Error(`Action is already ${action.status}`);
  }

  if (new Date(action.expires_at).getTime() <= Date.now()) {
    await updatePendingActionStatus({
      userId,
      actionId: action.id,
      status: "expired",
    });

    throw new Error("Approval has expired");
  }

  const updated = await updatePendingActionStatus({
    userId,
    actionId: action.id,
    status: "rejected",
  });

  return {
    actionId: updated?.id ?? action.id,
    actionType: action.action_type,
    rejected: true,
  };
}