import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';
import { Group } from 'components/Layout';
import Tooltip from 'components/Tooltip';

import * as Types from './types';

export const StyledSelect = styled.div<Types.StyledSelectProps>`
  ${(props) => {
    const { error } = props;

    return css`
      select {
        position: relative;
        appearance: none;
        padding: ${theme.distance.tiny + 1}px ${theme.distance.tiny + 30}px
          ${theme.distance.tiny + 1}px ${theme.distance.tiny + 7.5}px;
        background: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.65685 11.3137L11.3137 5.65686H0L5.65685 11.3137Z' fill='%234A4A4A'/%3E%3C/svg%3E%0A")
          no-repeat;
        background-position-x: calc(100% - 8px);
        background-position-y: 42%;
        font-size: ${theme.typography.size.normal};
        color: ${theme.colors.grey_1};
        width: 100%;
        box-sizing: border-box;
        display: block;
        transition: all 0.2s ease-in-out;
        border-radius: ${theme.border.radius.normal};
        border: ${theme.border.size.normal} solid
          ${error ? theme.colors.error : theme.colors.grey_4};
        z-index: 1;

        :hover {
          border-color: ${error ? theme.colors.error : theme.colors.primary_2};
        }

        :focus {
          outline: none;
          border-color: ${error ? theme.colors.error : theme.colors.primary_2};
        }
      }

      label {
        display: block;
        color: ${theme.colors.grey_1};
        margin-bottom: 8px;
      }
    `;
  }}
`;

interface Props {
  className?: string;
  children?: React.ReactNode;
  display?: string;
  name: string;
  id: string;
  defaultValue?: string;
  error?: boolean;
  tooltip?: string;
  dataset?: (e: React.ChangeEvent<HTMLSelectElement>) => string;
  onHandleChange?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    target?: string
  ) => void;
}

export const Select: React.FC<Props> = (props) => {
  const {
    className,
    children,
    name,
    id,
    display,
    onHandleChange,
    defaultValue,
    dataset,
    error,
    tooltip = '',
  } = props;

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onHandleChange) {
      onHandleChange(e, e.target.value);

      if (dataset) e.target.dataset.id = dataset(e);
    }
  };

  return (
    <StyledSelect className={className} error={error}>
      {tooltip ? (
        <Group>
          <label htmlFor={name}>{display}</label>
          <Tooltip description={tooltip} />
        </Group>
      ) : (
        <label htmlFor={name}>{display}</label>
      )}
      <select
        id={id}
        name={name}
        onChange={onChangeSelect}
        defaultValue={defaultValue}
      >
        {children}
      </select>
    </StyledSelect>
  );
};
