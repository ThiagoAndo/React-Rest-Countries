import { Typography } from "@mui/material";
import { useContext } from "react";
import { ClockContext } from "../../../store/context/clock";

const UTCDatetime = () => {
  const context = useContext(ClockContext);

  let hour = undefined;
  let minute = undefined;
  let sec = undefined;

  if (context.timer) {
    if (context.timer.getHours() <= 9) {
      hour = "0" + context.timer.getHours();
    } else if (context.timer.getHours() > 9) {
      hour = context.timer.getHours();
    }
    if (context.timer.getMinutes() <= 9) {
      minute = "0" + context.timer.getMinutes();
    } else if (context.timer.getMinutes() > 9) {
      minute = context.timer.getMinutes();
    }

    if (context.timer.getSeconds() <= 9) {
      sec = "0" + context.timer.getSeconds();
    } else if (context.timer.getSeconds() > 9) {
      sec = context.timer.getSeconds();
    }
  }

  const utcTimeValue = (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontWeight: "400",
        fontSize: { xs: "10px", sm: "12px" },
        color: "rgba(255, 255, 255, .7)",
        lineHeight: 1,
        paddingRight: "2px",
        fontFamily: "Poppins",
      }}
    >
      {hour && hour + ":" + minute + ":" + sec}
    </Typography>
  );
  return utcTimeValue;
};

export default UTCDatetime;
