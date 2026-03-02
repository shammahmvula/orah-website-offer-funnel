import { motion } from 'framer-motion';
import { ClickFunnelLayout } from './ClickFunnelLayout';

export function ClickFunnelDisqualifiedPage() {
  return (
    <ClickFunnelLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            No worries!
          </h2>
          <p className="text-muted-foreground mb-4">
            It sounds like the timing isn't quite right. When you're ready to level up your online presence, we'll be here.
          </p>
          <p className="text-sm text-muted-foreground">
            Feel free to come back anytime.
          </p>
        </div>
      </motion.div>
    </ClickFunnelLayout>
  );
}
