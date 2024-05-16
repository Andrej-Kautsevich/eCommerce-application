import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBox() {
  return <FormControlLabel control={<Checkbox />} label="Set as default address" />;
}
