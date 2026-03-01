import { useState } from 'react';
import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const featureOptions = [
  'Online booking',
  'Contact forms',
  'Photo gallery',
  'Testimonials',
  'Service descriptions',
  'Location map',
  'Price list',
  'Team profiles',
];

export function Q8FeaturesQuestion() {
  const { updateData, setCurrentQuestion, personalizeText } = useIndustryFunnel();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setSelected(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleContinue = () => {
    updateData('features', selected);
    setTimeout(() => setCurrentQuestion(10), 200);
  };

  return (
    <IndustryQuestionCard
      question={personalizeText("What must your new {industry} website have?")}
      subhead="Select all that apply"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {featureOptions.map(f => (
          <label
            key={f}
            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
              selected.includes(f) ? 'border-accent bg-accent/5' : 'border-primary/20 hover:border-accent/50'
            }`}
          >
            <Checkbox
              checked={selected.includes(f)}
              onCheckedChange={() => toggleFeature(f)}
            />
            <span className="text-foreground">{f}</span>
          </label>
        ))}
      </div>
      <Button
        onClick={handleContinue}
        disabled={selected.length === 0}
        className="btn-primary mt-4"
      >
        Continue →
      </Button>
    </IndustryQuestionCard>
  );
}
