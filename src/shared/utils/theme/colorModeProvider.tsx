import { PaletteMode, useMediaQuery } from '@mui/material';
import { ReactNode, createContext, useMemo, useState } from 'react';

type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: PaletteMode;
};

export const ColorModeContext = createContext<ColorModeContextType>({ toggleColorMode: () => {}, mode: 'light' });

interface ToggleColorModeProps {
  children: ReactNode;
}
const ColorModeProvider = ({ children }: ToggleColorModeProps) => {
  // check if users use dark mode in browser by default
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const defaultMode: PaletteMode = prefersDarkMode ? 'dark' : 'light';

  const [mode, setMode] = useState<PaletteMode>(defaultMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  return <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>;
};

export default ColorModeProvider;
