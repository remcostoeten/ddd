import { create } from 'zustand';

type FontSize = 'small' | 'medium' | 'large';
type CursorSize = 'small' | 'medium' | 'large';

type SettingsStore = {
  isSettingsOpen: boolean;
  toggleSettingsModal: () => void;
  showAppearanceSettings: boolean;
  theme: string;
  setTheme: (theme: "dark" | "light" | "system") => void;
  showFontSizeSetting: boolean;
  showCursorSizeSetting: boolean;
  showReducedMotionSetting: boolean;
  showHighContrastSetting: boolean;
  showDyslexicFontSetting: boolean;
  showCompactModeSetting: boolean;
  showNotificationSettings: boolean;
  notificationsEnabled: boolean;
  notificationSound: boolean;
  showKeyboardSettings: boolean;
  keyboardShortcutsEnabled: boolean;
  trackingEnabled: boolean;
  showPrivacySettings: boolean;
  fontSize: FontSize;
  highContrastMode: boolean;
  dyslexicFont: boolean;
  cursorSize: CursorSize;
  reducedMotion: boolean;
  compactMode: boolean;
  setFontSize: (size: FontSize) => void;
  setCursorSize: (size: CursorSize) => void;
  toggleSetting: (setting: keyof Omit<SettingsStore, 'setFontSize' | 'setCursorSize' | 'toggleSetting' | 'toggleSettingsModal' | 'setTheme'>) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  isSettingsOpen: false,
  toggleSettingsModal: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  showAppearanceSettings: true,
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  showFontSizeSetting: true,
  showCursorSizeSetting: true,
  showReducedMotionSetting: true,
  showHighContrastSetting: true,
  showDyslexicFontSetting: true,
  showCompactModeSetting: true,
  showNotificationSettings: true,
  notificationsEnabled: true,
  notificationSound: true,
  showKeyboardSettings: true,
  keyboardShortcutsEnabled: true,
  trackingEnabled: false,
  showPrivacySettings: true,
  fontSize: 'medium',
  highContrastMode: false,
  dyslexicFont: false,
  cursorSize: 'medium',
  reducedMotion: false,
  compactMode: false,
  setFontSize: (size) => set({ fontSize: size }),
  setCursorSize: (size) => set({ cursorSize: size }),
  toggleSetting: (setting) => set((state) => ({ [setting]: !state[setting] })),
}));

