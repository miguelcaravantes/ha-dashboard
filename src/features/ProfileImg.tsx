import { useHass } from '../common/hooks/useHass.js';
import type { HassEntity } from '../types/entities.js';
import { isString } from '../common/utils/typeGuards.js';

const isPerson = ([entityId]: [string, HassEntity]) =>
  entityId.startsWith('person.');
const withUser =
  (userId: string) =>
    ([, stateObj]: [string, HassEntity]) =>
      stateObj.attributes.user_id === userId;

export default function ProfileImg() {
  const { user, states } = useHass();
  const userId = user?.id;
  if (!userId || !states) return null;

  const personEntry = Object.entries(states)
    .filter(isPerson)
    .find(withUser(userId));

  if (!personEntry) return null;
  const person = personEntry[1];

  const imageUrl = isString(person.attributes.entity_picture)
    ? person.attributes.entity_picture
    : undefined;
  const name = isString(person.attributes.friendly_name)
    ? person.attributes.friendly_name
    : '';
  const initial = name.substring(0, 1).toUpperCase();

  return (
    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
          {initial}
        </div>
      )}
    </div>
  );
}
