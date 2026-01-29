import type { HomeAssistant } from "../../types/home-assistant.js";
import type { EntityId, HassEntity } from "../../types/entities.js";

/**
 * Checks if a value is a string.
 */
export const isString = (val: unknown): val is string =>
  typeof val === "string";

/**
 * Checks if a value is a number and not NaN.
 */
export const isNumber = (val: unknown): val is number =>
  typeof val === "number" && !isNaN(val);

/**
 * Checks if a value is a valid Home Assistant EntityId (domain.object_id).
 */
export const isEntityId = (val: unknown): val is EntityId => {
  if (!isString(val)) return false;
  return val.includes(".") && val.split(".").length === 2;
};

/**
 * Checks if a value is defined (not null or undefined).
 */
export const isDefined = <T>(val: T | undefined | null): val is T =>
  val !== undefined && val !== null;

/**
 * Checks if a value is an object and not null.
 */
export const isObject = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null;

/**
 * Checks if a value looks like a HomeAssistant object.
 */
export const isHass = (val: unknown): val is HomeAssistant => {
  if (!isObject(val)) return false;
  return (
    "states" in val &&
    "services" in val &&
    "config" in val &&
    "callService" in val &&
    typeof val.callService === "function"
  );
};

/**
 * Checks if an entity has brightness attribute.
 */
export const hasBrightness = (
  entity: HassEntity,
): entity is HassEntity & { attributes: { brightness: number } } => {
  return isNumber(entity.attributes.brightness);
};

/**
 * Checks if an entity has temperature attribute.
 */
export const hasTemperature = (
  entity: HassEntity,
): entity is HassEntity & { attributes: { temperature: number } } => {
  return isNumber(entity.attributes.temperature);
};

/**
 * Checks if an entity has rgb_color attribute.
 */
export const hasRGBColor = (
  entity: HassEntity,
): entity is HassEntity & {
  attributes: { rgb_color: [number, number, number] };
} => {
  const color = entity.attributes.rgb_color;
  return Array.isArray(color) && color.length === 3 && color.every(isNumber);
};

/**
 * Checks if an entity has color_temp attribute.
 */
export const hasColorTemp = (
  entity: HassEntity,
): entity is HassEntity & { attributes: { color_temp: number } } => {
  return isNumber(entity.attributes.color_temp);
};

/**
 * Checks if a value has a 'default' property (common for CJS/ESM interop).
 */
export const hasDefault = <T>(val: unknown): val is { default: T } =>
  isObject(val) && "default" in val;
