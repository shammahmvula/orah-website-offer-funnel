
-- Create survey_responses table for remarketing and market research
CREATE TABLE public.survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  province TEXT,
  business_age TEXT,
  monthly_revenue TEXT,
  industry TEXT,
  website_situation TEXT,
  investment_ready TEXT,
  motivation TEXT,
  full_name TEXT,
  business_name TEXT,
  email TEXT,
  whatsapp TEXT,
  website_url TEXT,
  google_reviews_interest BOOLEAN DEFAULT false,
  is_disqualified BOOLEAN DEFAULT false,
  disqualification_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public survey, no auth required)
CREATE POLICY "Anyone can submit survey responses"
ON public.survey_responses
FOR INSERT
WITH CHECK (true);

-- Only authenticated admin can read (for future admin dashboard)
CREATE POLICY "Admins can view survey responses"
ON public.survey_responses
FOR SELECT
USING (true);
