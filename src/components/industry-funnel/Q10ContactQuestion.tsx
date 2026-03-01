import { useState } from 'react';
import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function Q10ContactQuestion() {
  const { data, updateData, setIsCompleted } = useIndustryFunnel();
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.fullName.trim()) e.fullName = 'Required';
    if (!data.businessName.trim()) e.businessName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email required';
    if (!data.whatsapp.trim()) e.whatsapp = 'Required';
    if (!data.billingAddress.trim()) e.billingAddress = 'Required';
    if (!agreed) e.agreed = 'You must agree to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
    setIsCompleted(true);
  };

  const fields: { key: keyof typeof data; label: string; placeholder: string; required: boolean; type?: string; hint?: string }[] = [
    { key: 'fullName', label: 'Full Name', placeholder: 'John Smith', required: true },
    { key: 'businessName', label: 'Business Name', placeholder: 'Smith Plumbing', required: true },
    { key: 'email', label: 'Email Address', placeholder: 'john@smithplumbing.co.za', required: true, type: 'email' },
    { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '082 123 4567', required: true, type: 'tel', hint: "We'll contact you on WhatsApp for faster communication" },
    { key: 'billingAddress', label: 'Business / Billing Address', placeholder: 'e.g., 123 Main Rd, Sandton, Gauteng', required: true, hint: 'We need this for your invoice' },
    { key: 'websiteUrl', label: 'Current Website (optional)', placeholder: 'www.example.co.za', required: false },
  ];

  return (
    <IndustryQuestionCard
      question="Last step — where should we send your custom design?"
    >
      <p className="text-muted-foreground mb-6">
        Let's get your details so our designer can reach out via WhatsApp.
      </p>

      <div className="space-y-4">
        {fields.map(f => (
          <div key={f.key}>
            <Label className="text-foreground">
              {f.label} {f.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              value={data[f.key] as string}
              onChange={e => updateData(f.key, e.target.value)}
              placeholder={f.placeholder}
              type={f.type || 'text'}
              className={`h-12 mt-1 rounded-xl border-primary/20 ${errors[f.key] ? 'border-destructive' : ''}`}
            />
            {f.hint && <p className="text-sm text-muted-foreground mt-1">{f.hint}</p>}
            {errors[f.key] && (
              <p className="text-destructive text-sm mt-1">{errors[f.key]}</p>
            )}
          </div>
        ))}

        <label className={`flex items-start gap-3 p-4 rounded-xl border ${errors.agreed ? 'border-destructive' : 'border-border'} cursor-pointer`}>
          <Checkbox
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="mt-0.5 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <span className="text-sm text-foreground">
            I understand this is for a limited R5,000 offer and I'm ready to secure my spot with a 50% deposit once approved.
          </span>
        </label>
        {errors.agreed && <p className="text-destructive text-sm">{errors.agreed}</p>}
      </div>

      <Button onClick={handleSubmit} className="btn-primary mt-6">
        SUBMIT MY APPLICATION →
      </Button>
    </IndustryQuestionCard>
  );
}
