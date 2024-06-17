import { PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material';
import { ReactNode, createContext, useMemo, useState } from 'react';
import getTheme from '../../ui/theme';

type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: PaletteMode;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

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

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
