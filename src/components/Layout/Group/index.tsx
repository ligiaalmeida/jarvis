import React from 'react';

import { Direction } from 'types';
import { Container } from 'components/Layout/Group/styles';

import * as Types from './types';

export const Group: React.FC<Types.GroupProps<Direction>> = ({
  children,
  flexDirection = 'row',
  margin = [0, 0, 0, 0],
  unitOfMeasurement = 'px',
}) => {
  return (
    <Container
      itemsDirection={flexDirection}
      margin={margin}
      unitOfMeasurement={unitOfMeasurement}
    >
      {children}
    </Container>
  );
};
