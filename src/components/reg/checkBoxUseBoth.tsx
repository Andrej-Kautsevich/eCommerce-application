import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBoxUseBoth() {
  return <FormControlLabel control={<Checkbox />} label="Use the same address for both" />;
}
