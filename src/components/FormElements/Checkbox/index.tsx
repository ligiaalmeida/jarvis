import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

import * as Types from './types';

const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  + div {
    margin-left: 24px;
  }

  input {
    display: none;

    :checked + label:before {
      background-color: ${theme.colors.primary_3};
      border-color: ${theme.colors.primary_3};
    }
  }

  label {
    font-size: ${theme.typography.size.normal};
    color: ${theme.colors.grey_1};
    display: block;
    padding-left: 25px;
    margin-bottom: 0;

    :after {
      content: '';
      display: block;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggZD0iTTE5LjkyNSAxMS4xMDhhLjMyOS4zMjkgMCAwIDAtLjQ4NiAwbC01LjEyNSA1LjQxYS4zMjguMzI4IDAgMCAxLS40ODcgMGwtMi4yNDYtMi40MjZhLjMyOS4zMjkgMCAwIDAtLjQ4NyAwbC0uOTkyLjk0NmEuMzc3LjM3NyAwIDAgMC0uMTAyLjI1NmMwIC4wOTQuMDM2LjE5My4xMDIuMjY0bDIuMjY1IDIuNTIuNDg3LjUyLjk3MyAxLjA0MWEuMzMuMzMgMCAwIDAgLjQ4NyAwbDYuNTg1LTYuOTdhLjM4Ny4zODcgMCAwIDAgMC0uNTIxbC0uOTc0LTEuMDR6IiBpZD0iYSIvPjwvZGVmcz48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAgLTExKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+');

      width: 11px;
      height: 9px;
      position: absolute;
      left: 3px;
      top: 4px;
      //top: 50%;
      //transform: translateY(-50%);
    }

    :before {
      content: '';
      display: block;
      width: 15px;
      height: 15px;
      border: 1px solid ${theme.colors.grey_3};
      border-radius: ${theme.border.radius.normal};
      position: absolute;
      left: 0;
    }

    :hover {
      color: ${theme.colors.primary_3};

      :before {
        border: 1px solid ${theme.colors.primary_3};
        box-shadow: 0 0 3px ${theme.colors.primary_3};
      }
    }
  }
`;

export const Checkbox: React.FC<Types.CheckboxProps> = ({
  label,
  id,
  name,
  value,
  checked = false,
}) => {
  return (
    <CheckBoxWrapper>
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        defaultChecked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </CheckBoxWrapper>
  );
};
