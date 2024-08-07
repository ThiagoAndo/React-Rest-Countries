import { Typography } from '@mui/material';
import { ModeAction } from '../../../store/context/mode';
import { useContext } from "react";

const SectionHeader = ({ title, mb }) => {
  const context = useContext(ModeAction);

  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{
        fontSize: { xs: "7px", sm: "11px", md: "13px" },
        color: context.mode ? "black" : "white",
        fontWeight: "600",
        lineHeight: 1,
        textAlign: "center",
        fontFamily: "Roboto Condensed",
        marginBottom: mb ? mb : "1rem",
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
