import { Typography, Grid } from '@material-ui/core';
import React from 'react';
import styled from '@material-ui/styled-engine';
import EntityCard from './EntityCard/EntityCard';
import { orange, blue } from '@material-ui/core/colors';

const RoomContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

export default function CardDashboard() {
  return (
    <>
      <section>
        <Typography variant="h6">Bedroom</Typography>
        <RoomContainer>
          <EntityCard entityId="light.bedroom_lights" />
          <EntityCard entityId="fan.bedroom_fan" />
          <EntityCard entityId="switch.bedroom_diffuser" />
          <EntityCard entityId="sensor.bedroom_temperature" color={orange} />
          <EntityCard entityId="sensor.bedroom_humidity" color={blue} />
          <EntityCard entityId="binary_sensor.bedroom_window" />
        </RoomContainer>
      </section>
      <section>
        <Typography variant="h6">Studio</Typography>
        <RoomContainer>
          <EntityCard entityId="light.studio_lights" />
          <EntityCard entityId="switch.studio_fan" />
          <EntityCard entityId="switch.desktop_charger" />
          <EntityCard entityId="binary_sensor.studio_window" />
        </RoomContainer>
      </section>
      <section>
        <Typography variant="h6">Girls&apos; room</Typography>
        <RoomContainer>
          <EntityCard entityId="light.girls_ceiling_light" />
        </RoomContainer>
      </section>
      <section>
        <Typography variant="h6">Corridor</Typography>
        <RoomContainer>
          <EntityCard entityId="light.corridor_light" />
          <EntityCard entityId="binary_sensor.corridor_bathroom_door" />
        </RoomContainer>
      </section>
      <section>
        <Typography variant="h6">Kitchen</Typography>
        <RoomContainer>
          <EntityCard entityId="light.kitchen_light" />
          <EntityCard entityId="switch.kitchen_diffuser" />
        </RoomContainer>
      </section>
      <section>
        <Typography variant="h6">Living Room</Typography>
        <RoomContainer>
          <EntityCard entityId="light.living_room_lights" />
        </RoomContainer>
      </section>
      <section>
        <Typography variant="h6">Garden</Typography>
        <RoomContainer>
          <EntityCard entityId="light.garden_lights" />
        </RoomContainer>
      </section>
      <section>
        <Typography variant="h6">Backyard</Typography>
        <RoomContainer>
          <EntityCard entityId="binary_sensor.backyard_door_1" />
          <EntityCard entityId="binary_sensor.backyard_door_2" />
        </RoomContainer>
      </section>
    </>
  );
}
