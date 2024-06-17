import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, CircularProgress } from '@mui/material';
import { Translate } from '@mui/icons-material';
import { useState } from 'react';
import i18n from '../../shared/i18n/i18n';
import { LanguagesKeys } from '../../shared/types/enum';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState<LanguagesKeys>(LanguagesKeys.EN);
  const [loading, setLoading] = useState(false);

  const handleChange = async (event: SelectChangeEvent) => {
    setLoading(true);
    const newLanguage = event.target.value as LanguagesKeys;
    setLanguage(newLanguage);
    await i18n.changeLanguage(newLanguage);
    setLoading(false);
  };

  return (
    <FormControl>
      <InputLabel id="choose-language-label">Choose language</InputLabel>
      <Select
        size="small"
        labelId="choose-language-label"
        value={language}
        label="Choose language"
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
        <MenuItem value={LanguagesKeys.RU}>Russian</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
