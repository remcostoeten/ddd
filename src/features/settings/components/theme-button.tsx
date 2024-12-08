import { TypeIcon as type, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeButtonProps {
  value: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function ThemeButton({ value, icon: Icon, label, isActive, onClick }: ThemeButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center p-3 border rounded-lg transition-all duration-200",
        isActive
          ? "bg-[#3ECF8E]/20 text-[#3ECF8E] border-[#3ECF8E]"
          : "border-input hover:border-accent hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0.5,
          scale: isActive ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center"
      >
        <Icon className="h-5 w-5 mr-2 transition-colors" />
        <span className="font-medium">
          {label}
        </span>
      </motion.div>
    </motion.button>
  );
}

