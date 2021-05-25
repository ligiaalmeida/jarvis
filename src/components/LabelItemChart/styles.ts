import styled, { css } from 'styled-components';

import * as Types from 'types';

export const Tag = styled.span<Types.LabelItemChartContainerProps>`
  ${(props) => {
    const { colorTag } = props;

    return css`
      position: relative;
      width: 16px;
      height: 16px;
      display: block;
      border-radius: 50%;
      background-color: ${colorTag};
    `;
  }};
`;

export const Label = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;

      > span:nth-child(2) {
        font-size: 1.6rem;
        font-weight: normal;
        color: ${theme.colors.grey_1};
        margin-left: 8px;
      }

      svg {
        width: 100%;
        opacity: 0.75;
      }
    `;
  }};
`;
