import { DiscountCode } from '@commercetools/platform-sdk';
import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import Countdown, { zeroPad } from 'react-countdown';
import { useAppSelector } from '../../shared/store/hooks';

interface PromoCodeBoxProps {
  item: DiscountCode;
}

interface RendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const renderer = ({ days, hours, minutes, seconds, completed }: RendererProps, t: TFunction) => {
  if (completed) {
    // Render a completed state
    return <Typography variant="body1">{t('Discount code expired')}</Typography>;
  }
  // Render a countdown
  return (
    <>
      <Typography variant="body1">{t('Hurry Up!')}</Typography>
      <Typography variant="subtitle2" component="span">
        {t('Discount expired in')} {}
        <Typography variant="h5" component="span">
          {days} days {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </Typography>
      </Typography>
    </>
  );
};

const PromoCodeBox = ({ item }: PromoCodeBoxProps) => {
  const { t } = useTranslation();
  const { language } = useAppSelector((state) => state.localization);
  const { description, code, isActive, validUntil } = item;

  return (
    <Box
      sx={(theme) => ({
        borderRadius: '10px',
        p: 3,
        mt: 3,
        boxShadow: `0px 4px 8px ${theme.palette.primary.main}`,
      })}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Paper
        sx={{ borderRadius: 1, p: 1, width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Use default discount code description if undefined */}
        <Typography gutterBottom variant="h6" textAlign="center">
          {description?.[language] ?? t('Try this cool discount code: ')}
        </Typography>
        <Typography variant="h4">{code}</Typography>
        {/* Countdown timer */}
        {isActive && <Countdown date={validUntil} renderer={(props) => renderer(props, t)} />}
      </Paper>
    </Box>
  );
};

export default PromoCodeBox;
