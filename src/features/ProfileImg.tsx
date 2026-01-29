import { useHass } from '../common/hooks/useHass.js';
import { Avatar } from '@mui/material';
import type { HassEntity } from '../types/entities.js';

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

  const imageUrl = person.attributes.entity_picture as string | undefined;
  const name = (person.attributes.friendly_name as string) || '';
  const initial = name.substring(0, 1).toUpperCase();

  return (
    <Avatar alt={name} {...(imageUrl ? { src: imageUrl } : {})}>
      {initial}
    </Avatar>
  );
}
