import styled, { css } from 'styled-components';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from '@material-ui/core';
import { TableRowProps } from 'pages/FaultPredictionPage/types';

export const Table = styled(MuiTable)`
  min-width: 550px;
`;

export const TableHead = styled(MuiTableHead)`
  ${(props) => {
    const { theme } = props;

    return css`
      th {
        font-size: ${theme.typography.size.normal};
        color: ${theme.colors.primary_1};
        font-weight: ${theme.typography.weight.bold};
      }
    `;
  }}
`;

export const TableBody = styled(MuiTableBody)`
  ${(props) => {
    const { theme } = props;

    return css`
      th,
      td {
        font-size: ${theme.typography.size.normal};
      }
    `;
  }}
`;

export const TableRow = styled(MuiTableRow)<TableRowProps>`
  ${(props) => {
    const { percentage, theme } = props;

    return css`
      background-color: ${percentage > 0
        ? theme.colors.online_bg
        : percentage < 0
        ? theme.colors.error_bg
        : theme.colors.white};
    `;
  }}
`;
