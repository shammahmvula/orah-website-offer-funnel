
-- Enable pg_net extension for HTTP requests from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Grant usage to the net schema
GRANT USAGE ON SCHEMA net TO postgres, anon, authenticated, service_role;
