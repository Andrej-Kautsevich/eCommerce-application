import { FormControl, MenuItem, Select, SelectChangeEvent, CircularProgress } from '@mui/material';
import { Translate } from '@mui/icons-material';
import { useState } from 'react';
import i18n from '../../shared/i18n/i18n';
import { LanguagesKeys } from '../../shared/types/enum';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setLanguage } from '../../shared/store/auth/localizationSlice';

const LanguageSwitcher = () => {
  const { language } = useAppSelector((state) => state.localization);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleChange = async (event: SelectChangeEvent) => {
    setLoading(true);
    const newLanguage = event.target.value as LanguagesKeys;
    dispatch(setLanguage(newLanguage));
    await i18n.changeLanguage(newLanguage);
    setLoading(false);
  };

  return (
    <FormControl>
      <Select
        size="small"
        value={language}
        onChange={handleChange}
        startAdornment={<Translate />}
        endAdornment={
          loading && (
            <CircularProgress
              size="small"
              sx={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                marginTop: '-12px',
              }}
            />
          )
        }
      >
        <MenuItem value={LanguagesKeys.EN}>English</MenuItem>
        <MenuItem value={LanguagesKeys.RU}>Русский</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
