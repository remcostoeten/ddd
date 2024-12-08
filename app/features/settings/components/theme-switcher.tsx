import { Sun, Moon, Monitor } from 'lucide-react';
import { ThemeButton } from './theme-button';

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

const themes = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
] as const;

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div>
      <label className="text-sm font-medium">
        Theme
      </label>
      <div className="mt-2 grid grid-cols-3 gap-3">
        {themes.map(({ value, icon, label }) => (
          <ThemeButton
            key={value}
            value={value}
            icon={icon}
            label={label}
            isActive={currentTheme === value}
            onClick={() => onThemeChange(value as 'light' | 'dark' | 'system')}
          />
        ))}
      </div>
    </div>
  );
}

