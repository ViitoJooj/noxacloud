CREATE TABLE IF NOT EXISTS server_data (
    info_name VARCHAR(100) PRIMARY KEY,
    working BOOLEAN NOT NULL,
    uptime TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_server_data_name_uptime ON server_data (info_name, uptime DESC);
CREATE INDEX IF NOT EXISTS idx_server_data_failing ON server_data (info_name, uptime DESC) WHERE working = FALSE;