import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-4 right-4 z-50 flex justify-center"
        >
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-popup max-w-sm text-center">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
