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
import BinarySensor from './BinarySensor';

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
          <Tooltip title="Night Mode">
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
              <Entity entityId="light.bedroom_lights" name="Lights" />
            </Grid>
            <Grid item>
              <Entity entityId="fan.bedroom_fan" name="Fan" />
            </Grid>
            <Grid item>
              <Entity entityId="switch.bedroom_diffuser" name="Diffuser" />
            </Grid>
            <Grid item>
              <BinarySensor
                entityId="binary_sensor.bedroom_window"
                name="Window"
              />
            </Grid>
            <Grid item>
              <Sensor entityId="sensor.bedroom_temperature" />
            </Grid>{' '}
            <Grid item>
              <Sensor entityId="sensor.bedroom_humidity" />
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
              <Entity entityId="light.studio_lights" name="Lights" />
            </Grid>
            <Grid item>
              <Entity entityId="switch.studio_fan" name="Fan" />
            </Grid>
            <Grid item>
              <Entity entityId="switch.desktop_charger" name="Charger" />
            </Grid>
            <Grid item>
              <BinarySensor
                entityId="binary_sensor.studio_window"
                name="Window"
              />
            </Grid>
          </Grid>
        </Room>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Girls&apos; Room</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Entity entityId="light.girls_ceiling_light" name="Light" />
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
                <Entity entityId="light.corridor_light" name="Light" />
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
              <Entity entityId="light.kitchen_light" name="Light" />
            </Grid>
            <Grid item>
              <Entity entityId="switch.kitchen_diffuser" name="Diffuser" />
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
              <Entity entityId="light.living_room_lights" name="Lights" />
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
              <Entity entityId="light.garden_lights" name="Lights" />
            </Grid>
          </Grid>
        </Room>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Room>
          <Box textAlign="center" m={1}>
            <Typography variant="h5">Backyard</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <BinarySensor
                entityId="binary_sensor.backyard_door_1"
                name="Door 1"
              />
            </Grid>
            <Grid item>
              <BinarySensor
                entityId="binary_sensor.backyard_door_2"
                name="Door 2"
              />
            </Grid>
          </Grid>
        </Room>
      </Grid>
    </RootGrid>
  );
}
