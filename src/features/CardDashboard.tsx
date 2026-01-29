import EntityCard from "./EntityCard/EntityCard.js";
import { orange, blue, teal } from "@mui/material/colors";

export default function CardDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr w-full">
      <section>
        <h3 className="text-lg font-semibold mb-2">Bedroom</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.bedroom_light" title="Light" />
          <EntityCard
            entityId="light.secondary_bedroom_light"
            title="Secondary Light"
          />
          <EntityCard
            entityId="light.bedroom_window_light"
            title="Window Light"
          />
          <EntityCard entityId="fan.bedroom_fan" title="Fan" />
          <EntityCard entityId="switch.bedroom_diffuser" title="Diffuser" />
          <EntityCard
            entityId="sensor.bedroom_temperature"
            color={orange}
            title="Temperature"
          />
          <EntityCard
            entityId="sensor.bedroom_humidity"
            color={blue}
            title="Humidity"
          />
          <EntityCard entityId="binary_sensor.bedroom_window" title="Window" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Downstairs Bathroom</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard
            entityId="switch.downstairs_bathroom_diffuser"
            title="Diffuser"
          />
          <EntityCard
            entityId="switch.downstairs_bathroom_light"
            title="Light"
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Studio</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.studio_lights" title="Lights" />
          <EntityCard entityId="switch.studio_diffuser" title="Diffuser" />
          <EntityCard
            entityId="sensor.studio_temperature"
            color={orange}
            title="Temperature"
          />
          <EntityCard
            entityId="sensor.studio_humidity"
            color={blue}
            title="Humidity"
          />
          <EntityCard entityId="binary_sensor.studio_window" title="Window" />
          <EntityCard
            entityId="cover.studio_blackout_shade"
            title="Blackout shade"
          />
          <EntityCard
            entityId="cover.studio_light_filtering_shade"
            title="Light filtering shade"
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Girls&apos; room</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.girls_ceiling_light" title="Light" />
          <EntityCard entityId="fan.girls_fan" title="Fan" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Kitchen</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.kitchen_light" title="Light" />
          <EntityCard entityId="switch.kitchen_diffuser" title="Diffuser" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Dinning Room</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.dinning_room_switch" title="Light" />
          <EntityCard
            entityId="light.dinning_room_switch_2"
            title="Secondary Light"
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Living Room</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.living_room_lights" title="Lights" />
          <EntityCard
            entityId="light.living_room_secondary_light"
            title="Secondary Light"
          />
          <EntityCard
            entityId="light.christmas_tree"
            title="Christmas Tree"
            color={teal}
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Front Yard</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.front_yard_light" title="Lights" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Lobby</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.lobby_light" title="Lights" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Backyard</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.backyard_lights" title="Light" />
          <EntityCard entityId="binary_sensor.backyard_motion" title="Motion" />
          <EntityCard entityId="binary_sensor.backyard_door_1" title="Door 1" />
          <EntityCard entityId="binary_sensor.backyard_door_2" title="Door 2" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Roof garden</h3>
        <div className="grid grid-cols-2 gap-4">
          <EntityCard entityId="light.roof_garden_lights" title="Lights" />
        </div>
      </section>
    </div>
  );
}
