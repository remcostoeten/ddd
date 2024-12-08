import { Eye, Layout, Bell, Keyboard, Shield } from 'lucide-react';
import { useSettingsStore } from '../settings-store';
import { SettingsSection } from './settings-section';
import { ToggleSetting } from './toggle-setting';
import { Separator } from '@/shared/components/ui/separator';
import { ThemeSwitcher } from './theme-switcher';
import { FontSizeSelector } from './font-size-selector';
import { CursorSizeSelector } from './cursor-size-selector';

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

          {settings.showCursorSizeSetting && (
            <CursorSizeSelector />
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

          {settings.showDyslexicFontSetting && (
            <ToggleSetting
              label="Dyslexic-friendly Font"
              description="Use a font designed to be easier to read for people with dyslexia"
              checked={settings.dyslexicFont}
              onChange={() => settings.toggleSetting('dyslexicFont')}
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

      {settings.showNotificationSettings && (
        <>
          <Separator className="my-6" />
          <SettingsSection title="Notifications" icon={Bell}>
            <ToggleSetting
              label="Enable Notifications"
              description="Receive important updates and alerts"
              checked={settings.notificationsEnabled}
              onChange={() => settings.toggleSetting('notificationsEnabled')}
            />
            <ToggleSetting
              label="Notification Sound"
              description="Play a sound when receiving notifications"
              checked={settings.notificationSound}
              onChange={() => settings.toggleSetting('notificationSound')}
            />
          </SettingsSection>
        </>
      )}

      {settings.showKeyboardSettings && (
        <>
          <Separator className="my-6" />
          <SettingsSection title="Keyboard" icon={Keyboard}>
            <ToggleSetting
              label="Enable Keyboard Shortcuts"
              description="Use keyboard shortcuts for quick navigation"
              checked={settings.keyboardShortcutsEnabled}
              onChange={() => settings.toggleSetting('keyboardShortcutsEnabled')}
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

