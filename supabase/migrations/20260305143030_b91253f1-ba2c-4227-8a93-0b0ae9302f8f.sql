-- Drop and recreate triggers to ensure both exist
DROP TRIGGER IF EXISTS on_new_survey_response ON public.survey_responses;
CREATE TRIGGER on_new_survey_response
  AFTER INSERT ON public.survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead();