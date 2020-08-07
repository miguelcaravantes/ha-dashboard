import React from 'react';
import { useHass } from '../hooks/useHass';
import styled from 'styled-components';

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100%;
`;

export default function ProfileImg() {
  const { user, states } = useHass();
  const userId = user.id;
  const person = Object.entries(states)
    .filter((s) => s[0].startsWith('person.'))
    .find((s) => s[1].attributes.user_id === userId)[1];

  const imageUrl = person.attributes.entity_picture;
  return imageUrl ? <Image src={imageUrl} /> : null;
}
