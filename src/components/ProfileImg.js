import React from 'react';
import { useHass } from '../hooks/useHass';
import { Avatar } from '@material-ui/core';

export default function ProfileImg() {
  const { user, states } = useHass();
  const userId = user?.id;
  if (!userId) return null;

  const person = Object.entries(states)
    .filter((s) => s[0].startsWith('person.'))
    .find((s) => s[1].attributes.user_id === userId)[1];

  const imageUrl = person.attributes.entity_picture;
  const name = person.attributes.friendly_name;
  const inital = name.substring(0, 1).toUpperCase();

  return (
    <Avatar alt={name} src={imageUrl + 23}>
      {inital}
    </Avatar>
  );
}
