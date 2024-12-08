import { MousePointer } from 'lucide-react';
import { useSettingsStore } from '../settings-store';
import { cn } from '@/lib/utils';

type CursorSize = 'small' | 'medium' | 'large';

export function CursorSizeSelector() {
  const { cursorSize, setCursorSize } = useSettingsStore();

  const cursorSizes: CursorSize[] = ['small', 'medium', 'large'];

  return (
    <div>
      <label className="text-sm font-medium text-foreground">
        Cursor Size
      </label>
      <div className="mt-2 flex items-center space-x-2">
        {cursorSizes.map((size) => (
          <button
            key={size}
            onClick={() => setCursorSize(size)}
            className={cn(
              "flex items-center justify-center p-2 rounded-md transition-colors duration-200",
              cursorSize === size
                ? "bg-[#3ECF8E]/20 text-[#3ECF8E] border border-[#3ECF8E]"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <MousePointer className="h-4 w-4 mr-2" />
            <span className="capitalize">{size}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

