import { css, ThemedStyledProps } from 'styled-components';
import { styled, Theme } from 'types';
import { motion as Motion } from 'framer-motion';

import * as Types from './types';

export const Container = styled.div.attrs(({ classNameContainerIcon }: Types.ContainerAttrs) => ({
  className: classNameContainerIcon,
}))<Types.ContainerAttrs>`
  position: relative;
`;

export const ContainerIcon = styled.div`
  position: relative;
  bottom: 4px;
  left: 1px;
  width: 23px;
  height: 23px;
  padding: 5px;
  cursor: pointer;
`;

export const ContainerTooltip = styled(Motion.div).attrs(({ classNameContainerTooltip }: Types.ContainerAttrs) => ({
  className: classNameContainerTooltip,
}))<Types.ContainerAttrs & ThemedStyledProps<Types.ContainerTooltipProps, Theme>>`
  ${(props) => {
    const { theme, countCharacters = 0 } = props;

    return css`
      position: absolute;
      top: calc(50% - 9px);
      left: 32px;
      transform: translateY(-50%);
      background: #ffffff;
      width: 40rem;
      padding: 16px;
      border-radius: 4px;
      border: 1px solid ${theme.colors.grey_4};
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
      z-index: 99999;

      ${countCharacters >= 250
        ? css`
            overflow-y: scroll;
            max-height: 150px;
          `
        : ''}

      & > div {
        & span {
          display: block;
          width: 100%;
        }

        &,
        span,
        p {
          font-family: 'Cairo', sans-serif;
          color: ${theme.colors.grey_1};
          font-size: 12px;
          line-height: 18px;
        }
      }

      :after {
        content: '';
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%) rotate(-90deg);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 12px solid transparent;
      }
    `;
  }};
`;
