import styled, { css } from 'styled-components';

import { KeysGrid } from 'types';
import { formatSpaceSize, getGridSize } from 'utils/styles/lib';
import { Transition } from 'utils/styles/mixins';

import { theme } from 'styles/theme';

import { ContentProps } from './types';

export const Content = styled.div<ContentProps>`
  ${(props) => {
    const { flexDirection, padding, margin } = props;

    const breakpoints = Object.keys(props)
      .filter((key) => theme.breakpoints.keySizes.includes(key))
      .map((key) => {
        const size = getGridSize(props, key);

        return theme.breakpoints.default('min')[key as KeysGrid](
          css`
            max-width: ${theme.awesomegrid.sizes[size - 1]}%;
            width: ${theme.awesomegrid.sizes[size - 1]}%;
          `
        );
      });

    const paddingSize = Object.keys(padding).map((key) => {
      const [paddingFormat] = formatSpaceSize(padding[key as KeysGrid] || []);

      return (
        padding &&
        padding[key as KeysGrid] &&
        paddingFormat.length &&
        theme.breakpoints.default('min')[key as KeysGrid](css`
          padding: ${paddingFormat};
        `)
      );
    });

    const marginSize = Object.keys(margin).map((key) => {
      const [margin] = formatSpaceSize(padding[key as KeysGrid] || []);

      return (
        padding &&
        padding[key as KeysGrid] &&
        margin.length &&
        theme.breakpoints.default('min')[key as KeysGrid](css`
          margin: ${margin};
        `)
      );
    });

    return css`
      position: relative;
      display: flex;
      flex-direction: ${flexDirection};
      ${breakpoints};
      ${paddingSize};
      ${marginSize};
      ${theme.breakpoints.default('min').xs(
        css`
          margin: ${formatSpaceSize([0, 0, 'px'] || [])};
        `
      )};
      margin-bottom: 0;
      ${Transition('max-width')};

      label {
        display: block;
        color: ${theme.colors.grey_1};
        margin-bottom: 8px;
      }
    `;
  }};
`;
