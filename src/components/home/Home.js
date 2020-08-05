import React from 'react';
import Entity from '../Entity';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Grid
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { WeatherNight as WeatherNightIcon } from 'mdi-material-ui';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  room: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Home(props) {
  const classes = useStyles();

  const handleNightMode = () => {
    props.hass.callService('script', 'night_mode');
  };

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container>
            <Grid item>
              <Tooltip title="Mode Noche">
                <IconButton onClick={handleNightMode}>
                  <WeatherNightIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Box className={classes.room}>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Bedroom</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.bedroom_lights"></Entity>
            </Grid>
            <Grid item>
              <Entity entityId="fan.bedroom_fan"></Entity>
            </Grid>
            <Grid item>
              <Entity entityId="switch.bedroom_diffuser"></Entity>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Box className={classes.room}>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Studio</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.studio_lights"></Entity>
            </Grid>
            <Grid item>
              <Entity entityId="switch.studio_fan"></Entity>
            </Grid>
            <Grid item>
              <Entity entityId="switch.desktop_charger"></Entity>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Box className={classes.room}>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Girls' Room</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.girls_ceiling_light"></Entity>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Box className={classes.room}>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Corridor</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Grid item>
                <Entity entityId="light.corridor_light"></Entity>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Box className={classes.room}>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Kitchen</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.kitchen_light"></Entity>
            </Grid>
            <Grid item>
              <Entity entityId="switch.kitchen_diffuser"></Entity>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Box className={classes.room}>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Living Room</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.living_room_lights"></Entity>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Box className={classes.room}>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Garden</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.garden_lights"></Entity>
            </Grid>

          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
