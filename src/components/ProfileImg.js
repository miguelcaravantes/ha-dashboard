import React from 'react';
import { useHass } from '../hooks/useHass';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  profile: {
    width: '36px',
    borderRadius: '100%',
  },
});

export default function ProfileImg() {
  const { user, states } = useHass();
  const classes = useStyles();
  const userId = user.id;
  const person = Object.entries(states)
    .filter((s) => s[0].startsWith('person.'))
    .find((s) => s[1].attributes.user_id === userId)[1];

  const imageUrl = person.attributes.entity_picture;
  return imageUrl ? <img src={imageUrl} className={classes.profile} /> : null;
}
