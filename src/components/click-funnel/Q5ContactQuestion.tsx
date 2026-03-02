import { useState } from 'react';
import { QuestionCard } from '../survey/QuestionCard';
import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

export function Q5ContactQuestion() {
  const { data, updateData, setIsCompleted } = useClickFunnel();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.firstName.trim()) e.firstName = 'Required';
    if (!data.lastName.trim()) e.lastName = 'Required';
    if (!data.phone.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || submitting) return;
    setSubmitting(true);

    try {
      await supabase.from('survey_responses').insert({
        full_name: `${data.firstName.trim()} ${data.lastName.trim()}`,
        whatsapp: data.phone.trim(),
        motivation: data.motivation,
        investment_ready: data.budget,
        industry: data.heardAbout,
        website_situation: data.seriousness,
        funnel_source: 'click-funnel',
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        utm_content: data.utmContent || null,
        utm_term: data.utmTerm || null,
      });

      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      setIsCompleted(true);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <QuestionCard question="You're almost there! Where can we reach you?">
      <p className="text-muted-foreground mb-6 text-sm">
        Drop your details below and one of our designers will be in touch shortly.
      </p>

      <div className="space-y-4">
        <div>
          <Label className="text-foreground">First Name <span className="text-destructive">*</span></Label>
          <Input
            value={data.firstName}
            onChange={e => updateData('firstName', e.target.value)}
            placeholder="John"
            className={`h-12 mt-1 rounded-xl border-primary/20 ${errors.firstName ? 'border-destructive' : ''}`}
          />
          {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <Label className="text-foreground">Last Name <span className="text-destructive">*</span></Label>
          <Input
            value={data.lastName}
            onChange={e => updateData('lastName', e.target.value)}
            placeholder="Smith"
            className={`h-12 mt-1 rounded-xl border-primary/20 ${errors.lastName ? 'border-destructive' : ''}`}
          />
          {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <Label className="text-foreground">Phone Number <span className="text-destructive">*</span></Label>
          <Input
            type="tel"
            value={data.phone}
            onChange={e => updateData('phone', e.target.value)}
            placeholder="082 123 4567"
            className={`h-12 mt-1 rounded-xl border-primary/20 ${errors.phone ? 'border-destructive' : ''}`}
          />
          <p className="text-sm text-muted-foreground mt-1">We'll reach out via WhatsApp or phone call</p>
          {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
        </div>

        <Button onClick={handleSubmit} disabled={submitting} className="btn-primary mt-4 w-full">
          {submitting ? 'SUBMITTING...' : 'GET MY FREE QUOTE →'}
        </Button>
      </div>
    </QuestionCard>
  );
}
