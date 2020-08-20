import React from 'react';
import Icon from './Icon';
import useEntity from '../hooks/useEntity';

export default function EntityIcon({ entityId }) {
  const { icon } = useEntity(entityId);
  return <Icon icon={icon} />;
}
