import { useEffect, useCallback } from 'react';

type KeyCombo = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
};

type KeyboardShortcutOptions = {
  preventDefault?: boolean;
  stopPropagation?: boolean;
};

export function useKeyboardShortcut(
  keyCombo: KeyCombo | KeyCombo[],
  callback: () => void,
  options: KeyboardShortcutOptions = {}
) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const combos = Array.isArray(keyCombo) ? keyCombo : [keyCombo];
      
      const isMatch = combos.some(combo => {
        const keyMatch = event.key.toLowerCase() === combo.key.toLowerCase();
        const ctrlMatch = combo.ctrl ? event.ctrlKey : !event.ctrlKey;
        const metaMatch = combo.meta ? event.metaKey : !event.metaKey;
        const shiftMatch = combo.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = combo.alt ? event.altKey : !event.altKey;
        
        return keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch;
      });

      if (isMatch) {
        if (options.preventDefault) {
          event.preventDefault();
        }
        if (options.stopPropagation) {
          event.stopPropagation();
        }
        callback();
      }
    },
    [keyCombo, callback, options]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
}

