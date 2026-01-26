import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const proofMessages = [
  { name: "Thabo M.", location: "Pretoria", action: "just secured his spot ✓" },
  { name: "Nomsa K.", location: "Durban", action: "just applied for her website" },
  { name: "Johan V.", location: "Cape Town", action: "just qualified" },
  { name: "Precious M.", location: "Johannesburg", action: "secured spot #38" },
];

interface SocialProofPopupProps {
  visible: boolean;
  onHide: () => void;
}

export function SocialProofPopup({ visible, onHide }: SocialProofPopupProps) {
  const [proof] = useState(() => proofMessages[Math.floor(Math.random() * proofMessages.length)]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-auto sm:bottom-6 sm:left-6 z-40"
        >
          <div className="bg-card rounded-xl shadow-popup p-4 max-w-[280px] mx-auto sm:mx-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground flex-shrink-0">
                {proof.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {proof.name} from {proof.location}
                </p>
                <p className="text-muted-foreground text-sm">{proof.action}</p>
                <p className="text-xs text-muted-foreground mt-0.5">2 minutes ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
