import { QuestionCard } from '../QuestionCard';
import { useSurvey } from '@/contexts/SurveyContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const features = [
  { label: "📱 Mobile-friendly design", default: true, note: "Included on all sites!" },
  { label: "📸 Photo gallery / Portfolio", default: false },
  { label: "📅 Online booking / Appointments", default: false },
  { label: "🛒 E-commerce / Online shop", default: false },
  { label: "📧 Contact form / Lead capture", default: false },
  { label: "📍 Location map / Directions", default: false },
  { label: "💬 WhatsApp integration", default: false },
  { label: "⭐ Customer reviews / Testimonials", default: false },
  { label: "📝 Blog / News section", default: false },
];

export function FeaturesQuestion() {
  const { surveyData, updateSurveyData, setCurrentQuestion } = useSurvey();

  const toggleFeature = (feature: string) => {
    const current = surveyData.features;
    if (current.includes(feature)) {
      updateSurveyData('features', current.filter(f => f !== feature));
    } else {
      updateSurveyData('features', [...current, feature]);
    }
  };

  return (
    <QuestionCard
      question="What features are most important for your website?"
      showBack
      onBack={() => setCurrentQuestion(7)}
    >
      <p className="text-sm text-muted-foreground mb-4">(Select all that apply)</p>
      <div className="space-y-3">
        {features.map((feature) => (
          <label
            key={feature.label}
            className="flex items-start gap-3 p-3 rounded-xl border border-border hover:border-accent transition-colors cursor-pointer"
          >
            <Checkbox
              checked={surveyData.features.includes(feature.label)}
              onCheckedChange={() => toggleFeature(feature.label)}
              className="mt-0.5 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            <div>
              <span className="text-foreground">{feature.label}</span>
              {feature.note && (
                <span className="text-xs text-success ml-2">({feature.note})</span>
              )}
            </div>
          </label>
        ))}
      </div>
      <Button
        onClick={() => setCurrentQuestion(9)}
        className="w-full h-12 mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
      >
        Continue →
      </Button>
    </QuestionCard>
  );
}
