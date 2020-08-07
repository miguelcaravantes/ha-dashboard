import React from 'react';
import Entity from './Entity';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Grid,
} from '@material-ui/core';
import styled from 'styled-components';

import { WeatherNight as WeatherNightIcon } from 'mdi-material-ui';
import { useHass } from '../hooks/useHass';
import Sensor from './Sensor';

const RootGrid = styled(Grid)`
  flex-grow: 1;
`;

const Room = styled.div`
  padding: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Bar = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

export default function Home() {
  const { callService } = useHass();

  const handleNightMode = () => {
    callService('script', 'night_mode');
  };

  return (
    <RootGrid container spacing={4}>
      <Grid item xs={12}>
        <Bar>
          <Tooltip title="Mode Noche">
            <IconButton onClick={handleNightMode}>
              <WeatherNightIcon />
            </IconButton>
          </Tooltip>
        </Bar>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
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
            <Grid item>
              <Sensor entityId="sensor.bedroom_temperature"></Sensor>
            </Grid>{' '}
            <Grid item>
              <Sensor entityId="sensor.bedroom_humidity"></Sensor>
            </Grid>
          </Grid>
        </Room>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
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
        </Room>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Girls' Room</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.girls_ceiling_light"></Entity>
            </Grid>
          </Grid>
        </Room>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
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
        </Room>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
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
        </Room>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Living Room</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.living_room_lights"></Entity>
            </Grid>
          </Grid>
        </Room>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Garden</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.garden_lights"></Entity>
            </Grid>
          </Grid>
        </Room>
      </Grid>
    </RootGrid>
  );
}
