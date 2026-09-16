CREATE TABLE IF NOT EXISTS pending_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  action_type TEXT NOT NULL CHECK (
    action_type IN (
      'cancel_meeting',
      'reschedule_meeting',
      'create_meeting'
    )
  ),

  payload JSONB NOT NULL,

  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN (
      'pending',
      'approved',
      'rejected',
      'expired'
    )
  ),

  expires_at TIMESTAMPTZ NOT NULL DEFAULT (
    NOW() + INTERVAL '10 minutes'
  ),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pending_actions_user_status
  ON pending_actions(user_id, status);

CREATE INDEX IF NOT EXISTS idx_pending_actions_expires_at
  ON pending_actions(expires_at);
