import { css } from 'styled-components';

import { styled } from 'types';
import * as Types from './types';

export const Container = styled.div<Types.GroupContainerProps>`
  ${(props) => {
    const { itemsDirection = 'row', margin = [0, 0, 0, 0], unitOfMeasurement = 'px' } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: ${itemsDirection};
      margin: ${margin.map((item) => `${item}${item === 0 ? '' : unitOfMeasurement}`).join(' ')};
    `;
  }};
`;
