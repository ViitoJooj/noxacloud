CREATE TABLE IF NOT EXISTS action_confirm (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    action VARCHAR(50) NOT NULL,
    payload JSONB,
    status VARCHAR(10) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')),
    error_message TEXT,
    attempts INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_action_confirm_pending ON action_confirm(status) WHERE status = 'PENDING';