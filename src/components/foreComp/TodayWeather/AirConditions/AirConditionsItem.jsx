import { Box, Grid, SvgIcon } from '@mui/material';
import { ModeAction } from '../../../../store/context/mode';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import OpacityIcon from "@mui/icons-material/Opacity";
import { useContext } from "react";

// import { ReactComponent as HumidityIcon } from '../../../assets/humidity.svg';

const AirConditionsItem = (props) => {
  let iconContent;
  const context = useContext(ModeAction);

  if (props.type === 'temperature')
    iconContent = <ThermostatIcon sx={{ fontSize: '12px' }} />;
  else if (props.type === 'wind')
    iconContent = <AirIcon sx={{ fontSize: '12px' }} />;
  else if (props.type === 'clouds')
    iconContent = <FilterDramaIcon sx={{ fontSize: '12px' }} />;
  else if (props.type === 'humidity')
     iconContent = <OpacityIcon sx={{ fontSize: "12px" }} />;


  return (
    <Grid
      item
      xs={3}
      sx={{
        padding: "0",
        height: "80px",
      }}
    >
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          height: "5px",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: context.mode ? "black" : "white",
            padding: 0,
          }}
        >
          {iconContent}
        </Box>
        <Box
          sx={{
            color: context.mode ? "black" : "white",
            fontSize: { xs: "12px", sm: "17px", md: "10px" },
            paddingLeft: { xs: "0px", sm: "4px", md: "6px" },
            paddingTop: { xs: "2px", sm: "0px" },
            display: "flex",
            alignItems: "center",
          }}
        >
          {props.title}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "40px" }}
      >
        <Box
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: { xs: "12px", sm: "17px", md: "13px" },

            color: context.mode ? "black" : "white",
            lineHeight: 1,
          }}
        >
          {props.value}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AirConditionsItem;
