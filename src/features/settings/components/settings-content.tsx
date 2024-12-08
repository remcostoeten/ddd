import { Eye, Layout, Shield } from 'lucide-react';
import { useSettingsStore } from '../settings-store';
import { SettingsSection } from './settings-section';
import { ToggleSetting } from './toggle-setting';
import { Separator } from '@/shared/components/ui/separator';
import { ThemeSwitcher } from './theme-switcher';
import { FontSizeSelector } from './font-size-selector';

export function SettingsContent() {
  const settings = useSettingsStore();

  return (
    <div className="space-y-6">
      {settings.showAppearanceSettings && (
        <SettingsSection title="Appearance" icon={Eye}>
          <ThemeSwitcher
            currentTheme={settings.theme}
            onThemeChange={settings.setTheme}
          />

          {settings.showFontSizeSetting && (
            <FontSizeSelector />
          )}

          {settings.showMonoFontSetting && (
            <ToggleSetting
              label="Monospace Font"
              description="Use JetBrains Mono for a developer-friendly experience"
              checked={settings.monoFont}
              onChange={() => settings.toggleSetting('monoFont')}
            />
          )}

          {settings.showReducedMotionSetting && (
            <ToggleSetting
              label="Reduced Motion"
              description="Minimize animations throughout the interface"
              checked={settings.reducedMotion}
              onChange={() => settings.toggleSetting('reducedMotion')}
            />
          )}

          {settings.showHighContrastSetting && (
            <ToggleSetting
              label="High Contrast Mode"
              description="Increase contrast for better visibility"
              checked={settings.highContrastMode}
              onChange={() => settings.toggleSetting('highContrastMode')}
            />
          )}
        </SettingsSection>
      )}

      {settings.showCompactModeSetting && (
        <>
          <Separator className="my-6" />
          <SettingsSection title="Interface" icon={Layout}>
            <ToggleSetting
              label="Compact Mode"
              description="Reduce spacing in the interface"
              checked={settings.compactMode}
              onChange={() => settings.toggleSetting('compactMode')}
            />
          </SettingsSection>
        </>
      )}

      {settings.showPrivacySettings && (
        <>
          <Separator className="my-6" />
          <SettingsSection title="Privacy" icon={Shield}>
            <ToggleSetting
              label="Usage Tracking"
              description="Allow anonymous usage data collection to improve the app"
              checked={settings.trackingEnabled}
              onChange={() => settings.toggleSetting('trackingEnabled')}
            />
          </SettingsSection>
        </>
      )}
    </div>
  );
}

