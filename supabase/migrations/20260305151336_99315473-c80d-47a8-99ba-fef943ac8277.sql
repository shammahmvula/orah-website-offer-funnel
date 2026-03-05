
-- Fix survey_responses INSERT policy: change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Anyone can submit survey responses" ON public.survey_responses;
CREATE POLICY "Anyone can submit survey responses"
  ON public.survey_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Fix website_leads INSERT policy: change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Anyone can submit website leads" ON public.website_leads;
CREATE POLICY "Anyone can submit website leads"
  ON public.website_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Fix admin SELECT policies too
DROP POLICY IF EXISTS "Admins can view all survey responses" ON public.survey_responses;
CREATE POLICY "Admins can view all survey responses"
  ON public.survey_responses
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

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
