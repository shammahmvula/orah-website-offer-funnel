
-- Drop and recreate as PERMISSIVE (default) policies
DROP POLICY IF EXISTS "Anyone can submit survey responses" ON public.survey_responses;
CREATE POLICY "Anyone can submit survey responses"
  ON public.survey_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all survey responses" ON public.survey_responses;
CREATE POLICY "Admins can view all survey responses"
  ON public.survey_responses
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anyone can submit website leads" ON public.website_leads;
CREATE POLICY "Anyone can submit website leads"
  ON public.website_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view website leads" ON public.website_leads;
CREATE POLICY "Admins can view website leads"
  ON public.website_leads
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can read roles" ON public.user_roles;
CREATE POLICY "Admins can read roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Re-create triggers (they're missing)
DROP TRIGGER IF EXISTS on_new_survey_response ON public.survey_responses;
CREATE TRIGGER on_new_survey_response
  AFTER INSERT ON public.survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead();

DROP TRIGGER IF EXISTS on_new_website_lead ON public.website_leads;
CREATE TRIGGER on_new_website_lead
  AFTER INSERT ON public.website_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_website_lead();

DROP TRIGGER IF EXISTS validate_survey_response_trigger ON public.survey_responses;
CREATE TRIGGER validate_survey_response_trigger
  BEFORE INSERT ON public.survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_survey_response();
