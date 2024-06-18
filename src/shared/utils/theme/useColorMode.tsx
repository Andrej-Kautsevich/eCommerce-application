import { useContext } from 'react';
import { ColorModeContext } from './colorModeProvider';

const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

export default useColorMode;
