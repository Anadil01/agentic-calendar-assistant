import { getPool } from "../db/pool.js";

export type PendingActionType =
  | "cancel_meeting"
  | "reschedule_meeting"
  | "create_meeting";

export type PendingActionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "expired";

export type PendingActionRow = {
  id: string;
  user_id: string;
  action_type: PendingActionType;
  payload: Record<string, unknown>;
  status: PendingActionStatus;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
};

export async function createPendingAction(input: {
  userId: string;
  actionType: PendingActionType;
  payload: Record<string, unknown>;
}) {
  const result = await getPool().query<PendingActionRow>(
    `
      INSERT INTO pending_actions (
        user_id,
        action_type,
        payload
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [input.userId, input.actionType, input.payload],
  );

  return result.rows[0];
}

export async function getPendingAction(input: {
  userId: string;
  actionId: string;
}) {
  const result = await getPool().query<PendingActionRow>(
    `
      SELECT
        id,
        user_id,
        action_type,
        payload,
        status,
        expires_at,
        created_at,
        updated_at
      FROM pending_actions
      WHERE id = $1
        AND user_id = $2
    `,
    [input.actionId, input.userId],
  );

  return result.rows[0] ?? null;
}

export async function updatePendingActionStatus(input: {
  userId: string;
  actionId: string;
  status: PendingActionStatus;
}) {
  const result = await getPool().query<PendingActionRow>(
    `
      UPDATE pending_actions
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
        AND user_id = $3
      RETURNING *
    `,
    [input.status, input.actionId, input.userId],
  );

  return result.rows[0] ?? null;
}

export async function getUserIdByAuthUserId(authUserId: string) {
  const result = await getPool().query<{ id: string }>(
    `
      SELECT id
      FROM users
      WHERE auth_user_id = $1
    `,
    [authUserId],
  );

  return result.rows[0]?.id ?? null;
}
