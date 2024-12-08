import { Type } from 'lucide-react';
import { useSettingsStore } from '../settings-store';
import { cn } from '@/utils';

type FontSize = 'small' | 'medium' | 'large';

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useSettingsStore();

  const fontSizes: FontSize[] = ['small', 'medium', 'large'];

  return (
    <div>
      <label className="text-sm font-medium text-foreground">
        Font Size
      </label>
      <div className="mt-2 flex items-center space-x-2">
        {fontSizes.map((size) => (
          <button
            key={size}
            onClick={() => setFontSize(size)}
            className={cn(
              "flex items-center justify-center p-2 rounded-md transition-colors duration-200",
              fontSize === size
                ? "bg-[#3ECF8E]/20 text-[#3ECF8E] border border-[#3ECF8E]"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Type className="h-4 w-4 mr-2" />
            <span className="capitalize">{size}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

