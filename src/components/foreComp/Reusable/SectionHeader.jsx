import { Typography } from '@mui/material';

const SectionHeader = ({ title, mb }) => {
  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{
        fontSize: { xs: '7px', sm: '11px', md: '13px' },
        color: 'rgba(255,255,255,.7)',
        fontWeight: '600',
        lineHeight: 1,
        textAlign: 'center',
        fontFamily: 'Roboto Condensed',
        marginBottom: mb ? mb : '1rem',
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
