import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, Star, CalendarIcon, Clock } from 'lucide-react';
import { useFunnel2 } from '@/contexts/Funnel2Context';
import { Button } from '@/components/ui/button';
import { FomoTicker } from '../FomoTicker';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from '@/components/ui/calendar';
import { format, addWeeks, isTuesday, isSaturday, startOfDay } from 'date-fns';

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
  '9:00 PM', '10:00 PM',
];

export function Funnel2SuccessPage() {
  const { surveyData } = useFunnel2();
  const [copied, setCopied] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('survey_submitted_funnel2');
    if (saved) return;

    const saveResponse = async () => {
      try {
        const { error } = await supabase.from('survey_responses').insert({
          monthly_revenue: surveyData.monthlyRevenue || null,
          investment_ready: surveyData.investmentReady || null,
          motivation: surveyData.motivation || null,
          full_name: surveyData.fullName || null,
          business_name: surveyData.businessName || null,
          email: surveyData.email || null,
          whatsapp: surveyData.whatsapp || null,
          website_url: surveyData.websiteUrl || null,
          billing_address: surveyData.billingAddress || null,
          google_reviews_interest: surveyData.googleReviewsInterest === 'yes',
          is_disqualified: false,
        });
        if (!error) {
          localStorage.setItem('survey_submitted_funnel2', 'true');
        }
      } catch (err) {
        // Silently handle
      }
    };
    saveResponse();
  }, []);

  const wantsReviews = surveyData.googleReviewsInterest === 'yes';
  const today = startOfDay(new Date());
  const maxDate = addWeeks(today, 4);

  const disabledDays = (date: Date) => {
    if (date < today) return true;
    if (date > maxDate) return true;
    return !isTuesday(date) && !isSaturday(date);
  };

  const bookingLine = selectedDate && selectedTime
    ? `Preferred consultation: ${format(selectedDate, 'EEEE, d MMMM yyyy')} at ${selectedTime}`
    : '';

  const emailBody = useMemo(() => `Hi there,

I just completed my application for a bespoke website.

Name: ${surveyData.fullName}
Business: ${surveyData.businessName}
Billing Address: ${surveyData.billingAddress}
Current website: ${surveyData.websiteUrl || 'None'}
${wantsReviews ? 'Google Reviews: Yes, interested in free month!\n' : ''}My motivation: "${surveyData.motivation}"
${bookingLine ? `\n${bookingLine}\n` : ''}
Looking forward to hearing from you!

${surveyData.fullName}
${surveyData.whatsapp}`, [surveyData, wantsReviews, bookingLine]);

  const emailText = `To: growth@getorah.co.za
Subject: Website Application - ${surveyData.businessName}

${emailBody}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoLink = `mailto:growth@getorah.co.za?subject=${encodeURIComponent(`Website Application - ${surveyData.businessName}`)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="min-h-screen bg-background">
      <FomoTicker />
      <div className="pt-20 pb-12 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto space-y-6">

          <div className="text-center">
            <h1 className="font-serif text-4xl text-foreground mb-2">
              You're in, {surveyData.fullName?.split(' ')[0]}! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              We're excited to design a website for {surveyData.businessName}.
            </p>
          </div>

          {wantsReviews && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-accent/10 border border-accent/30 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">⭐ Google Reviews Bonus Activated!</p>
                  <p className="text-sm text-foreground">
                    We'll set up your review generation system completely free for the first month alongside your new website.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="card-premium">
            <div className="flex items-center gap-2 mb-1">
              <CalendarIcon className="w-5 h-5 text-accent" />
              <h2 className="font-semibold text-foreground text-lg">Step 1: Pick a date for your final sales call</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">We'll present your custom mockup, finalize the build details, and walk you through flexible payment options.</p>

            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => { setSelectedDate(date); setSelectedTime(''); }}
                disabled={disabledDays}
                className="rounded-xl border border-border pointer-events-auto [&_.rdp-day:not([disabled])]:font-bold [&_.rdp-day:not([disabled])]:text-foreground"
                fromDate={today}
                toDate={maxDate}
              />
            </div>

            {selectedDate && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-accent" />
                  <p className="text-sm font-semibold text-foreground">
                    Available times for {format(selectedDate, 'EEEE, d MMMM')}:
                  </p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        selectedTime === time
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-muted/50 text-foreground border-border hover:border-accent/50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="card-premium">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-accent" />
              <h2 className="font-semibold text-foreground text-lg">Step 2: Send us your booking request</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Copy the email below and send it to confirm your consultation.</p>
            <p className="text-sm text-accent font-medium mb-4">📲 Once we receive your request, our designer will reach out via WhatsApp to discuss your vision and the vibe you want for your website, so keep an eye out!</p>

            <div className="relative bg-muted/50 rounded-xl p-4">
              <button onClick={handleCopy} className="absolute top-3 right-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {copied ? <><Check className="w-4 h-4 text-success" /><span className="text-success">Copied!</span></> : <><Copy className="w-4 h-4" /><span>Copy</span></>}
              </button>
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans pr-16">{emailText}</pre>
            </div>

            <Button onClick={handleCopy} className="w-full mt-4 h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base">
              {copied ? '✅ Copied! Now paste it in your email' : '📋 COPY EMAIL TO CLIPBOARD'}
            </Button>
          </div>

          <div className="space-y-3">
            <a href={mailtoLink} className="block">
              <Button className="btn-primary flex items-center justify-center gap-2"><Mail className="w-5 h-5" />SEND EMAIL NOW →</Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
