import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, Mail } from 'lucide-react';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export function IndustryResultsPage() {
  const { data, personalizeText } = useIndustryFunnel();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const save = async () => {
      await supabase.from('survey_responses').insert({
        full_name: data.fullName,
        business_name: data.businessName,
        email: data.email,
        whatsapp: data.whatsapp,
        website_url: data.websiteUrl || null,
        industry: data.industry,
        province: data.location,
        business_age: data.businessAge,
        website_situation: data.websiteSituation,
        investment_ready: data.investmentReady,
        motivation: data.motivation,
        is_disqualified: false,
      });
    };
    save();
  }, []);

  const summaryItems = [
    { label: 'Industry', value: data.industry },
    { label: 'Location', value: data.location },
    { label: 'Style', value: data.stylePreference },
    { label: 'Features', value: data.features.join(', ') },
  ];

  const emailText = `Hi Orah,\n\nI just submitted my application for a bespoke ${data.industry} website.\n\nName: ${data.fullName}\nBusiness: ${data.businessName}\nEmail: ${data.email}\nWhatsApp: ${data.whatsapp}\n\nLooking forward to seeing my custom design!\n\nThanks`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    'Our designer reviews your application',
    'We create a custom mockup for your business',
    'You review the design — no obligation',
    'Love it? We build your full site for R5,000',
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            You're in, {data.fullName.split(' ')[0]}! 🎉
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            {personalizeText("We're excited to design a website that makes other {industry} businesses jealous.")}
          </p>
        </div>

        <div className="card-premium">
          <h3 className="font-semibold text-foreground mb-3">Your Application Summary</h3>
          <div className="space-y-2">
            {summaryItems.map(item => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium">
          <h3 className="font-semibold text-foreground mb-4">What Happens Next</h3>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 text-accent text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-foreground text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">Send Us a Quick Email</h3>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/50 rounded-xl p-4">
            {emailText}
          </pre>
          <a
            href={`mailto:growth@getorah.co.za?subject=Website Application - ${data.businessName}&body=${encodeURIComponent(emailText)}`}
            className="block mt-4"
          >
            <Button className="btn-primary w-full">
              <Mail className="w-5 h-5 mr-2" /> Send Email →
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
