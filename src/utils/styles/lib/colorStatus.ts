import { css, FlattenSimpleInterpolation } from 'styled-components';

import EColorStatus from 'enums/colorStatus';
import colorsStatus from 'constants/colorsStatus';
import { theme } from 'styles/theme';

import { ColorStatusType } from 'types';

export const colorStatus = (
  status: ColorStatusType,
  color: string
): FlattenSimpleInterpolation => {
  switch (status) {
    case EColorStatus.EMPTY:
      return css`
        background-color: ${colorsStatus.empty};
        border: 1px solid ${theme.colors.white};
        span {
          color: ${theme.colors.grey_2};
        }
      `;
    case EColorStatus.ERROR:
      return css`
        background-color: ${color};
      `;
    default:
      return css`
        background-color: ${colorsStatus.default};
      `;
  }
};
