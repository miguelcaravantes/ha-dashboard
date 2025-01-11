import { useHass } from '../common/hooks/useHass';
import { Avatar } from '@mui/material';

const isPerson = ([s]) => s.startsWith('person.');
const withUser =
  (userId) =>
  ([, s]) =>
    s.attributes.user_id === userId;
export default function ProfileImg() {
  const { user, states } = useHass();
  const userId = user?.id;
  if (!userId) return null;

  const person = Object.entries(states)
    .filter(isPerson)
    .find(withUser(userId))[1];

  const imageUrl = person.attributes.entity_picture;
  const name = person.attributes.friendly_name;
  const inital = name.substring(0, 1).toUpperCase();

  return (
    <Avatar alt={name} src={imageUrl}>
      {inital}
    </Avatar>
  );
}
