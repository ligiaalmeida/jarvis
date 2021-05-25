import { css } from 'styled-components';
import { styled, SpacesCSS, Direction } from 'types';
import { formatSpaceSize } from 'utils/styles/lib';

type RowProps = {
  margin: SpacesCSS;
  padding: SpacesCSS;
  flexDirection: Direction;
};

export const Content = styled.div<RowProps>`
  ${(props) => {
    const { flexDirection, margin, padding } = props;
    const [marginFormat] = formatSpaceSize(margin);
    const [paddingFormat] = formatSpaceSize(padding);

    return css`
      position: relative;
      display: flex;
      flex-wrap: wrap;
      flex-direction: ${flexDirection};
      margin: ${marginFormat};
      padding: ${paddingFormat};
    `;
  }};
`;
