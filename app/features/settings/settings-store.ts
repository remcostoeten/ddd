import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontSize = 'small' | 'medium' | 'large';
type ColorScheme = 'light' | 'dark' | 'system';

interface SettingsState {
  // Theme settings
  theme: ColorScheme;
  reducedMotion: boolean;
  compactMode: boolean;
  fontSize: FontSize;
  highContrastMode: boolean;
  dyslexicFont: boolean;
  cursorSize: 'small' | 'medium' | 'large';
  
  // Notification settings
  notificationsEnabled: boolean;
  notificationSound: boolean;
  
  // Keyboard settings
  keyboardShortcutsEnabled: boolean;
  
  // Privacy settings
  trackingEnabled: boolean;
  
  // Configuration
  showAppearanceSettings: boolean;
  showReducedMotionSetting: boolean;
  showCompactModeSetting: boolean;
  showFontSizeSetting: boolean;
  showHighContrastSetting: boolean;
  showDyslexicFontSetting: boolean;
  showCursorSizeSetting: boolean;
  showNotificationSettings: boolean;
  showKeyboardSettings: boolean;
  showPrivacySettings: boolean;
  
  // Actions
  setTheme: (theme: ColorScheme) => void;
  setFontSize: (size: FontSize) => void;
  setCursorSize: (size: 'small' | 'medium' | 'large') => void;
  toggleSetting: (setting: keyof Omit<SettingsState, 'setTheme' | 'setFontSize' | 'setCursorSize' | 'toggleSetting'>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Theme settings
      theme: 'system',
      reducedMotion: false,
      compactMode: false,
      fontSize: 'medium',
      highContrastMode: false,
      dyslexicFont: false,
      cursorSize: 'medium',
      
      // Notification settings
      notificationsEnabled: true,
      notificationSound: true,
      
      // Keyboard settings
      keyboardShortcutsEnabled: true,
      
      // Privacy settings
      trackingEnabled: true,
      
      // Configuration
      showAppearanceSettings: true,
      showReducedMotionSetting: true,
      showCompactModeSetting: true,
      showFontSizeSetting: true,
      showHighContrastSetting: true,
      showDyslexicFontSetting: true,
      showCursorSizeSetting: true,
      showNotificationSettings: true,
      showKeyboardSettings: true,
      showPrivacySettings: true,
      
      // Actions
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setCursorSize: (cursorSize) => set({ cursorSize }),
      toggleSetting: (setting) => 
        set((state) => ({ [setting]: !state[setting] })),
    }),
    {
      name: 'user-settings',
    }
  )
);

