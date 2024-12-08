import { create } from 'zustand';

type FontSize = 'small' | 'medium' | 'large';

type SettingsStore = {
  isSettingsOpen: boolean;
  toggleSettingsModal: () => void;
  showAppearanceSettings: boolean;
  theme: string;
  setTheme: (theme: "dark" | "light" | "system") => void;
  showFontSizeSetting: boolean;
  showReducedMotionSetting: boolean;
  showHighContrastSetting: boolean;
  showMonoFontSetting: boolean;
  showCompactModeSetting: boolean;
  showPrivacySettings: boolean;
  trackingEnabled: boolean;
  fontSize: FontSize;
  highContrastMode: boolean;
  monoFont: boolean;
  reducedMotion: boolean;
  compactMode: boolean;
  setFontSize: (size: FontSize) => void;
  toggleSetting: (setting: keyof Omit<SettingsStore, 'setFontSize' | 'toggleSetting' | 'toggleSettingsModal' | 'setTheme'>) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  isSettingsOpen: false,
  toggleSettingsModal: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  showAppearanceSettings: true,
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  showFontSizeSetting: true,
  showReducedMotionSetting: true,
  showHighContrastSetting: true,
  showMonoFontSetting: true,
  showCompactModeSetting: true,
  showPrivacySettings: true,
  trackingEnabled: false,
  fontSize: 'medium',
  highContrastMode: false,
  monoFont: true,
  reducedMotion: false,
  compactMode: false,
  setFontSize: (size) => set({ fontSize: size }),
  toggleSetting: (setting) => set((state) => ({ [setting]: !state[setting] })),
}));

