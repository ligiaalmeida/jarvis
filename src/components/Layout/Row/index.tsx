import React from 'react';

import { RowProps } from './types';

import { Content } from './styles';

export const Row: React.FC<RowProps> = (props) => {
  const {
    children,
    margin = [0, 0, 0, 0, 'px'],
    padding = [0, 0, 0, 0, 'px'],
    flexDirection = 'row',
  } = props;

  return (
    <Content
      margin={margin}
      padding={padding}
      flexDirection={flexDirection}
      {...props}
    >
      {children}
    </Content>
  );
};
