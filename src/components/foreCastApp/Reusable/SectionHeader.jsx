import { Typography } from '@mui/material';
import { ModeAction } from '../../../store/context/mode';
import { useContext } from "react";

const SectionHeader = ({ title, mb, sc="1" , cl="" }) => {
  const context = useContext(ModeAction);

  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{
         fontSize: { xs: "12px", sm: "17px", md: "17px" },

        color:cl === "red"? cl : context.mode ? "black" : "white",
        fontWeight: "600",
        lineHeight: 1,
        textAlign: "center",
        fontFamily: "Roboto Condensed",
        marginBottom: mb ? mb : "1rem",
        scale:sc,
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
