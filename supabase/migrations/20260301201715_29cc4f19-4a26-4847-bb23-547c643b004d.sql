
CREATE TABLE public.website_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_type text,
  years_in_business text,
  location text,
  multiple_locations boolean DEFAULT false,
  location_count text,
  website_status text,
  review_count text,
  review_frequency text,
  call_handling text,
  biggest_challenge text,
  ready_to_start text,
  objection text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

ALTER TABLE public.website_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit website leads"
  ON public.website_leads
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view website leads"
  ON public.website_leads
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger to notify on new website lead
CREATE OR REPLACE FUNCTION public.notify_new_website_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  payload jsonb;
  request_id bigint;
BEGIN
  payload := jsonb_build_object('record', row_to_json(NEW), 'source', 'website');
  
  SELECT net.http_post(
    url := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_URL') || '/functions/v1/notify-new-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY')
    ),
    body := payload
  ) INTO request_id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_new_website_lead
  AFTER INSERT ON public.website_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_website_lead();
