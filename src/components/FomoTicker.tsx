import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "🔥 7 of 50 spots already claimed this week",
  "⏰ Limited offer ends in 7 days",
  "✨ Sarah from Cape Town just qualified 3 mins ago",
  "🚀 Only accepting 50 local businesses this quarter",
];

export function FomoTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-11 bg-gradient-to-r from-primary to-primary/90">
      <div className="h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-primary-foreground text-sm font-medium text-center"
          >
            {messages[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground/20">
        <div className="h-full w-[15%] bg-accent" />
      </div>
    </div>
  );
}
