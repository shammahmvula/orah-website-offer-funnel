import { useState } from 'react';
import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Q10ContactQuestion() {
  const { data, updateData, setIsCompleted } = useIndustryFunnel();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.fullName.trim()) e.fullName = 'Required';
    if (!data.businessName.trim()) e.businessName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email required';
    if (!data.whatsapp.trim()) e.whatsapp = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // Fire Meta Lead event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
    setIsCompleted(true);
  };

  const fields: { key: keyof typeof data; label: string; placeholder: string; required: boolean }[] = [
    { key: 'fullName', label: 'Full Name', placeholder: 'John Smith', required: true },
    { key: 'businessName', label: 'Business Name', placeholder: 'Smith Plumbing', required: true },
    { key: 'email', label: 'Email Address', placeholder: 'john@smithplumbing.co.za', required: true },
    { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '082 123 4567', required: true },
    { key: 'websiteUrl', label: 'Current Website (optional)', placeholder: 'www.example.co.za', required: false },
  ];

  return (
    <IndustryQuestionCard
      question="Last step — where should we send your custom design?"
    >
      <div className="space-y-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="text-sm font-medium text-foreground mb-1 block">
              {f.label} {f.required && <span className="text-destructive">*</span>}
            </label>
            <Input
              value={data[f.key] as string}
              onChange={e => updateData(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="h-12 rounded-xl border-primary/20"
            />
            {errors[f.key] && (
              <p className="text-destructive text-sm mt-1">{errors[f.key]}</p>
            )}
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit} className="btn-primary mt-6">
        Submit My Application →
      </Button>
    </IndustryQuestionCard>
  );
}
