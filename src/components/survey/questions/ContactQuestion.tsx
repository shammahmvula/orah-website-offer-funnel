import { useState } from 'react';
import { QuestionCard } from '../QuestionCard';
import { useSurvey } from '@/contexts/SurveyContext';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function ContactQuestion() {
  const { surveyData, updateSurveyData, setCurrentQuestion, setIsCompleted } = useSurvey();
  const [agreed, setAgreed] = useState(false);
  const [googleReviews, setGoogleReviews] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!surveyData.fullName.trim()) newErrors.fullName = 'Required';
    if (!surveyData.businessName.trim()) newErrors.businessName = 'Required';
    if (!surveyData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(surveyData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!surveyData.whatsapp.trim()) newErrors.whatsapp = 'Required';
    if (!surveyData.billingAddress.trim()) newErrors.billingAddress = 'Required';
    if (!agreed) newErrors.agreed = 'You must agree to continue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateSurveyData('googleReviewsInterest', googleReviews ? 'yes' : 'no');
      setIsCompleted(true);
    }
  };

  return (
    <QuestionCard
      question="🎉 Great news! Based on your answers, you're a strong candidate for our R5,000 offer."
      showBack
      onBack={() => setCurrentQuestion(7)}
    >
      {/* Google Reviews Offer */}
      <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6">
        <p className="text-foreground font-semibold mb-2">⭐ BONUS OFFER</p>
        <p className="text-sm text-foreground mb-3">
          Would you also like us to help you generate more 5-star Google reviews as well, <span className="font-semibold text-accent">on the house for one month?</span>
        </p>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            checked={googleReviews}
            onCheckedChange={(checked) => setGoogleReviews(checked as boolean)}
            className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <span className="text-sm text-foreground font-medium">Yes, I'd love free Google Reviews help! 🙌</span>
        </label>
      </div>

      <p className="text-muted-foreground mb-6">
        Final step: Let's get your details so our designer can reach out via WhatsApp.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-foreground">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Your name"
            value={surveyData.fullName}
            onChange={(e) => updateSurveyData('fullName', e.target.value)}
            className={`h-12 mt-1 ${errors.fullName ? 'border-destructive' : ''}`}
          />
          {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="businessName" className="text-foreground">Business Name *</Label>
          <Input
            id="businessName"
            placeholder="Your business name"
            value={surveyData.businessName}
            onChange={(e) => updateSurveyData('businessName', e.target.value)}
            className={`h-12 mt-1 ${errors.businessName ? 'border-destructive' : ''}`}
          />
          {errors.businessName && <p className="text-destructive text-sm mt-1">{errors.businessName}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@yourbusiness.co.za"
            value={surveyData.email}
            onChange={(e) => updateSurveyData('email', e.target.value)}
            className={`h-12 mt-1 ${errors.email ? 'border-destructive' : ''}`}
          />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="whatsapp" className="text-foreground">WhatsApp Number *</Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="e.g., 082 123 4567"
            value={surveyData.whatsapp}
            onChange={(e) => updateSurveyData('whatsapp', e.target.value)}
            className={`h-12 mt-1 ${errors.whatsapp ? 'border-destructive' : ''}`}
          />
          <p className="text-sm text-muted-foreground mt-1">We'll contact you on WhatsApp for faster communication</p>
          {errors.whatsapp && <p className="text-destructive text-sm mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <Label htmlFor="billingAddress" className="text-foreground">Business / Billing Address *</Label>
          <Input
            id="billingAddress"
            placeholder="e.g., 123 Main Rd, Sandton, Gauteng"
            value={surveyData.billingAddress}
            onChange={(e) => updateSurveyData('billingAddress', e.target.value)}
            className={`h-12 mt-1 ${errors.billingAddress ? 'border-destructive' : ''}`}
          />
          <p className="text-sm text-muted-foreground mt-1">We need this for your invoice</p>
          {errors.billingAddress && <p className="text-destructive text-sm mt-1">{errors.billingAddress}</p>}
        </div>

        <div>
          <Label htmlFor="websiteUrl" className="text-foreground">Website URL (optional)</Label>
          <Input
            id="websiteUrl"
            placeholder="www.yourbusiness.co.za (if you have one)"
            value={surveyData.websiteUrl}
            onChange={(e) => updateSurveyData('websiteUrl', e.target.value)}
            className="h-12 mt-1"
          />
        </div>

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

        <Button
          onClick={handleSubmit}
          className="btn-primary mt-4"
        >
          SUBMIT MY APPLICATION →
        </Button>
      </div>
    </QuestionCard>
  );
}
