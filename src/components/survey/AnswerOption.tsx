import { motion } from 'framer-motion';

interface AnswerOptionProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export function AnswerOption({ label, selected, onClick }: AnswerOptionProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`answer-option ${selected ? 'selected' : ''}`}
    >
      {label}
    </motion.button>
  );
}
