import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FomoTicker } from './FomoTicker';

export function DisqualifiedPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <FomoTicker />
      <div className="pt-20 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <div className="card-premium text-center">
            <h1 className="font-serif text-3xl text-foreground mb-6">
              We totally understand.
            </h1>
            
            <div className="text-muted-foreground text-left space-y-4 mb-8">
              <p>
                R5,000 is still an investment, even at 75% off.
              </p>
              <p>
                Here's the thing: we'd rather be honest than waste your time. Our bespoke websites require resources that don't allow us to go lower and maintain the quality we're known for.
              </p>
              <p>
                When you're ready to invest in your business's future, we'll be here.
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="font-semibold text-foreground mb-4">
                Not ready now? Here are some options:
              </h2>

              {submitted ? (
                <div className="bg-success/10 text-success p-4 rounded-xl">
                  <p className="font-medium">You're on the list!</p>
                  <p className="text-sm mt-1">We'll notify you of future offers.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                  <Button
                    onClick={handleSubmit}
                    className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Join Waitlist
                  </Button>
                </div>
              )}

              <p className="text-sm text-muted-foreground mt-6">
                Bookmark this page and come back when ready
                <br />
                <span className="text-xs">(But remember: only 50 spots this quarter)</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
