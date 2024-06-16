import { IconButton } from '@mui/material';
import { Brightness7 } from '@mui/icons-material';
import useColorMode from '../../shared/utils/theme/useColorMode';

const ThemeButton = () => {
  const { toggleColorMode } = useColorMode();

  const handleThemeToggle = () => {
    toggleColorMode();
  };

  return (
    <IconButton onClick={handleThemeToggle}>
      <Brightness7 />
    </IconButton>
  );
};

export default ThemeButton;
