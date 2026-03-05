
-- Fix notify_new_lead to not block inserts on failure
CREATE OR REPLACE FUNCTION public.notify_new_lead()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  payload jsonb;
  request_id bigint;
  base_url text;
  service_key text;
BEGIN
  -- Get secrets, but don't fail if they're missing
  BEGIN
    SELECT decrypted_secret INTO base_url FROM vault.decrypted_secrets WHERE name = 'SUPABASE_URL';
    SELECT decrypted_secret INTO service_key FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY';
  EXCEPTION WHEN OTHERS THEN
    RETURN NEW;
  END;

  IF base_url IS NULL OR service_key IS NULL THEN
    RETURN NEW;
  END IF;

  payload := jsonb_build_object('record', row_to_json(NEW));

  BEGIN
    SELECT net.http_post(
      url := base_url || '/functions/v1/notify-new-lead',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_key
      ),
      body := payload
    ) INTO request_id;
  EXCEPTION WHEN OTHERS THEN
    -- Log but don't block the insert
    RETURN NEW;
  END;

  RETURN NEW;
END;
$function$;

-- Same fix for notify_new_website_lead
CREATE OR REPLACE FUNCTION public.notify_new_website_lead()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  payload jsonb;
  request_id bigint;
  base_url text;
  service_key text;
BEGIN
  BEGIN
    SELECT decrypted_secret INTO base_url FROM vault.decrypted_secrets WHERE name = 'SUPABASE_URL';
    SELECT decrypted_secret INTO service_key FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY';
  EXCEPTION WHEN OTHERS THEN
    RETURN NEW;
  END;

  IF base_url IS NULL OR service_key IS NULL THEN
    RETURN NEW;
  END IF;

  payload := jsonb_build_object('record', row_to_json(NEW), 'source', 'website');

  BEGIN
    SELECT net.http_post(
      url := base_url || '/functions/v1/notify-new-lead',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_key
      ),
      body := payload
    ) INTO request_id;
  EXCEPTION WHEN OTHERS THEN
    RETURN NEW;
  END;

  RETURN NEW;
END;
$function$;
