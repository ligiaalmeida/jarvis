import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';

import * as Types from './types';

export const Input = styled.input.attrs((props: Types.InputAttrs) => ({
  value: props.value,
}))`
  ${(props: Types.InputProps) => {
    const { error } = props;
    return css`
      position: relative;
      background-color: ${theme.colors.white};
      padding: ${theme.distance.tiny};
      font-size: ${theme.typography.size.normal};
      border: ${theme.border.size.normal} solid
        ${error ? theme.colors.error : theme.colors.grey_3};
      border-radius: ${theme.border.radius.normal};
      color: ${theme.colors.grey_1};
      width: 100%;
      box-sizing: border-box;
      z-index: 1;

      :focus {
        outline: none;
        border-color: ${error ? theme.colors.error : theme.colors.primary_3};
      }

      :hover {
        border-color: ${error ? theme.colors.error : theme.colors.primary_3};
      }
    `;
  }};
`;
