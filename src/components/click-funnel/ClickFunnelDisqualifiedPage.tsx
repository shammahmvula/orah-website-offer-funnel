import { motion } from 'framer-motion';

export function ClickFunnelDisqualifiedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold text-foreground mb-3">
          No worries!
        </h1>
        <p className="text-muted-foreground mb-4">
          It sounds like the timing isn't quite right. When you're ready to level up your online presence, we'll be here.
        </p>
        <p className="text-sm text-muted-foreground">
          Feel free to come back anytime.
        </p>
      </motion.div>
    </div>
  );
}
