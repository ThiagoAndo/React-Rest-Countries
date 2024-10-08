import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function ErrorBox(props) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      margin={"auto"}
      marginLeft={5.5}
      gap={"8px"}
      sx={{
        padding: "1rem",
        flexDirection: { xs: "column", sm: "row" },
        marginTop: { xs: "14px", sm: "17px", md:"25px" },
        color: props.type === "info" ? "#f5a922" : "#DC2941",
        border:
          props.type === "info" ? "1px solid #f5a922" : "1px solid #DC2941",
        borderRadius: "8px",
        background:
          props.type === "info"
            ? "rgba(245, 169, 34, .1)"
            : "rgba(220, 41, 65, .25)",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: "24px" }} />
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize:
            props.type === "info"
              ? { xs: "12px", sm: "14px", md: "25px" }
              : { xs: "14px", sm: "16px", md: "27px" },
          fontFamily: "Poppins",
          textAlign: "center",
        }}
      >
        {props.errorMessage || "Internal error"}
      </Typography>
    </Box>
  );
}
