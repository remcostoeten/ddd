import { type LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function SettingsSection({ title, icon: Icon, children }: SettingsSectionProps) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Icon className="h-5 w-5 mr-2 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

