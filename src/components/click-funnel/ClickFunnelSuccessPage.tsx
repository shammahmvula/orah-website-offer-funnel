import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export function ClickFunnelSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          You're in! 🎉
        </h1>
        <p className="text-muted-foreground mb-2">
          One of our designers will reach out to you shortly to discuss your new website.
        </p>
        <p className="text-sm text-muted-foreground">
          Keep an eye on your phone, we move fast.
        </p>
      </motion.div>
    </div>
  );
}
