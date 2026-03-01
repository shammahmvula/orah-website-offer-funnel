
-- 1. Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Admins can view survey responses" ON public.survey_responses;

-- 2. Add server-side validation trigger
CREATE OR REPLACE FUNCTION public.validate_survey_response()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate email format if provided
  IF NEW.email IS NOT NULL AND NEW.email !~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  -- Length limits
  IF NEW.full_name IS NOT NULL AND length(NEW.full_name) > 200 THEN
    RAISE EXCEPTION 'Name too long';
  END IF;
  IF NEW.email IS NOT NULL AND length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email too long';
  END IF;
  IF NEW.whatsapp IS NOT NULL AND length(NEW.whatsapp) > 30 THEN
    RAISE EXCEPTION 'WhatsApp number too long';
  END IF;
  IF NEW.billing_address IS NOT NULL AND length(NEW.billing_address) > 500 THEN
    RAISE EXCEPTION 'Address too long';
  END IF;
  IF NEW.business_name IS NOT NULL AND length(NEW.business_name) > 200 THEN
    RAISE EXCEPTION 'Business name too long';
  END IF;
  IF NEW.motivation IS NOT NULL AND length(NEW.motivation) > 2000 THEN
    RAISE EXCEPTION 'Motivation text too long';
  END IF;
  IF NEW.website_url IS NOT NULL AND length(NEW.website_url) > 500 THEN
    RAISE EXCEPTION 'Website URL too long';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_survey_before_insert
  BEFORE INSERT ON public.survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_survey_response();
