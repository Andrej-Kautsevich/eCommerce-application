import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import useColorMode from '../../shared/utils/theme/useColorMode';

const ThemeButton = () => {
  const { toggleColorMode, mode } = useColorMode();

  const handleThemeToggle = () => {
    toggleColorMode();
  };

  return <IconButton onClick={handleThemeToggle}>{mode === 'dark' ? <Brightness7 /> : <Brightness4 />}</IconButton>;
};

export default ThemeButton;
