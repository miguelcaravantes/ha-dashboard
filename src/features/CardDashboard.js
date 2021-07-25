import { Typography, Grid } from '@material-ui/core';
import React from 'react';
// import styled from '@material-ui/styled-engine';
import EntityCard from './EntityCard/EntityCard';
import { orange, blue } from '@material-ui/core/colors';

// const RoomContainer = styled('div')(({ theme }) => ({
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
            <EntityCard entityId="light.bedroom_main_light" title="Light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="fan.bedroom_fan" title="Fan" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="switch.bedroom_diffuser" title="Diffuser" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="sensor.bedroom_temperature"
              color={orange}
              title="Temperature"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="sensor.bedroom_humidity"
              color={blue}
              title="Humidity"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="binary_sensor.bedroom_window"
              title="Window"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Dressing Room</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.dressing_room_light" title="Light" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Studio</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.studio_lights" title="Lights" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="switch.studio_fan" title="Fan" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="binary_sensor.studio_window" title="Window" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Girls&apos; room</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.girls_ceiling_light" title="Light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="fan.girls_fan" title="Fan" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="sensor.girls_room_temperature"
              color={orange}
              title="Temperature"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="sensor.girls_room_humidity"
              color={blue}
              title="Humidity"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Corridor</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.corridor_light" title="Light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="binary_sensor.corridor_bathroom_door"
              title="Bathroom Door"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Kitchen</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.kitchen_light" title="Light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="switch.kitchen_diffuser" title="Diffuser" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Living Room</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.living_room_lights" title="Lights" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="switch.living_room_fan" title="Fan" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Garden</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.garden_lights" title="Lights" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Backyard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.backyard_light" title="Light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="binary_sensor.backyard_door_1" title="Door" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Laundry</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.laundry_light" title="Light" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
