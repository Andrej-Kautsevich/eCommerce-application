import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

export default function CheckBoxUseBoth() {
  const [showBilling, setBilling] = useState(true);
  function isHideBilling() {
    if (showBilling) setBilling(false);
    else setBilling(true);
    return showBilling;
  }
  return (
    <FormControlLabel
      control={<Checkbox />}
      onChange={() => {
        isHideBilling();
      }}
      label="Use the same address for both"
    />
  );
}
