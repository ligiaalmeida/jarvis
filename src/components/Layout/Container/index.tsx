import React from 'react';

import { SpacesCSS } from 'types';
import { Spaces, ContainerProps } from './types';
import { Content } from './styles';

const INITIAL_SPACES_CSS: SpacesCSS = [0, 0, 0, 24, 'px'];

export const INITIAL_STATE_SPACES: Spaces = {
  xs: [0, 0, 0, 0, 'px'],
  sm: [0, 0, 0, 0, 'px'],
  md: INITIAL_SPACES_CSS,
  lg: INITIAL_SPACES_CSS,
  xl: INITIAL_SPACES_CSS,
  xxl: INITIAL_SPACES_CSS,
};

export const Container: React.FC<ContainerProps> = (props) => {
  const {
    xs = 16,
    sm,
    md,
    lg,
    xl,
    xxl,
    flexDirection = 'column',
    padding = INITIAL_STATE_SPACES,
    margin = INITIAL_STATE_SPACES,
    children,
  } = props;
  const sizes = { sm, md, lg, xl, xxl };

  return (
    <Content
      flexDirection={flexDirection}
      xs={xs}
      {...sizes}
      margin={margin}
      padding={padding}
      {...props}
    >
      {children}
    </Content>
  );
};
