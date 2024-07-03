import { Box, Typography } from '@mui/material';
import React from 'react';

const CityDateDetail = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: { xs: "6px", sm: "8px", md: "10px" },
          color: "white",
          textTransform: "uppercase",
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        {props.city}
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "6px", sm: "8px", md: "10px" },
          color: "rgba(255,255,255, .7)",
          lineHeight: 1,
          letterSpacing: { xs: "1px", sm: "0" },
          fontFamily: "Roboto Condensed",
        }}
      >
        Today {props.date}
      </Typography>
    </Box>
  );
};

export default CityDateDetail;
