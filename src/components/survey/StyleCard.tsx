import { motion } from 'framer-motion';

interface StyleCardProps {
  title: string;
  subtitle: string;
  gradient: string;
  selected?: boolean;
  onClick: () => void;
}

export function StyleCard({ title, subtitle, gradient, selected, onClick }: StyleCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full rounded-xl overflow-hidden border-2 transition-all duration-200 ${
        selected ? 'border-accent shadow-button' : 'border-transparent'
      }`}
    >
      <div className={`h-24 ${gradient}`} />
      <div className="bg-card p-4 text-left">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </motion.button>
  );
}
