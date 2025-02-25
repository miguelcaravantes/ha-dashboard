import { Typography, Grid } from '@mui/material';
import EntityCard from './EntityCard/EntityCard';
import { orange, blue, teal } from '@mui/material/colors';

export default function CardDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Bedroom</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.bedroom_light" title="Light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="light.secondary_bedroom_light"
              title="Secondary Light"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="light.bedroom_window_light"
              title="Window Light"
            />
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
            <EntityCard entityId="switch.bathroom_diffuser" title="Diffuser" />
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
            <EntityCard entityId="switch.studio_diffuser" title="Diffuser" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="sensor.studio_temperature"
              color={orange}
              title="Temperature"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="sensor.studio_humidity"
              color={blue}
              title="Humidity"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="binary_sensor.studio_window" title="Window" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="cover.studio_blackout_shade"
              title="Blackout shade"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="cover.studio_light_filtering_shade"
              title="Light filtering shade"
            />
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
        <Typography variant="h6">Dinning Room</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.dinning_room_switch" title="Light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="light.dinning_room_switch_2"
              title="Secondary Light"
            />
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
            <EntityCard
              entityId="light.living_room_secondary_light"
              title="Secondary Light"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="light.christmas_tree"
              title="Christmas Tree"
              color={teal}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Front Yard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.front_yard_light" title="Lights" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Lobby</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.lobby_light" title="Lights" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Backyard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.backyard_lights" title="Light" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="binary_sensor.backyard_motion"
              title="Motion"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="binary_sensor.backyard_door_1"
              title="Door 1"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <EntityCard
              entityId="binary_sensor.backyard_door_2"
              title="Door 2"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h6">Roof garden</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <EntityCard entityId="light.roof_garden_lights" title="Lights" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
