import { Grid } from '@mui/material';
import AirConditions from './AirConditions/AirConditions';
import Details from './Details/Details';

const TodayWeather = ({ data }) => {
  return (
    <Grid container sx={{ padding: '2rem 0rem 0rem' }}>
      <Details data={data} />
      <AirConditions data={data} />
    </Grid>
  );
};

export default TodayWeather;
