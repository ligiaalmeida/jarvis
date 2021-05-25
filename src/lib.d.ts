import * as Styled from 'styled-components';
import * as React from 'react';
import * as ChartJS from 'chart.js';

import { theme } from 'styles/theme';
import payload from '../internals/mocks/payloadMock';

declare global {
  type StyledISimpleInterpolation = Styled.SimpleInterpolation;
  type StyledIFlattenSimpleInterpolation = Styled.FlattenSimpleInterpolation;
  type ReactPropsWithChildren<P> = P & { children?: React.ReactNode };
  type ChartJsChartData = ChartJS.ChartData;
  type Theme = typeof theme;
  type Payload = typeof payload;
}
