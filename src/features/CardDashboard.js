import { Typography, Grid } from '@material-ui/core';
import React from 'react';
// import styled from '@material-ui/styled-engine';
import EntityCard from './EntityCard/EntityCard';
import { orange, blue } from '@material-ui/core/colors';

// const RoomContainer = styled.div(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'row',
//   gap: theme.spacing(2),
//   flexWrap: 'wrap',
// }));

export default function CardDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Bedroom</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.bedroom_main_light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="fan.bedroom_fan" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="switch.bedroom_diffuser" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="sensor.bedroom_temperature" color={orange} />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="sensor.bedroom_humidity" color={blue} />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="binary_sensor.bedroom_window" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Dressing Room</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.dressing_room_light" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Studio</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.studio_lights" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="switch.studio_fan" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="switch.desktop_charger" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="binary_sensor.studio_window" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Girls&apos; room</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.girls_ceiling_light" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Corridor</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.corridor_light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="binary_sensor.corridor_bathroom_door" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Kitchen</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.kitchen_light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="switch.kitchen_diffuser" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Living Room</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.living_room_lights" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Garden</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.garden_lights" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Backyard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.backyard_light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="binary_sensor.backyard_door_1" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="binary_sensor.backyard_door_2" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
