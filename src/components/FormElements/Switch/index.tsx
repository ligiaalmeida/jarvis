import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { Transition } from 'utils/styles/mixins';

import * as Types from './types';

const SwitchComponent: React.FC<Types.SwitchProps> = ({
  enabled = false,
  className,
  label,
  onChange,
}) => {
  const [toggle, setToggle] = useState(enabled);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (onChange && count > 0) onChange(toggle);
  }, [count, onChange, toggle]);

  return (
    <div
      className={className}
      onClick={() => {
        setToggle(!toggle);
        setCount(count + 1);
      }}
    >
      <span>{label}</span>
      <button className={toggle ? 'enabled' : ''}>&nbsp;</button>
    </div>
  );
};

const Switch = styled(SwitchComponent)<Types.SwitchProps>`
  ${(props) => {
    const {
      theme,
      labelDirection = 'right',
      fontSize,
      padding = ' 0 16px',
      scaleSwitch = 1,
    } = props;

    return css`
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: ${padding};
      cursor: pointer;

      ${labelDirection === 'right' &&
      css`
        flex-direction: row-reverse;
      `}

      :hover {
        background-color: ${theme.colors.grey_6};
        span {
          color: #000;
        }

        button {
          border: 1px solid ${theme.colors.primary_2};

          :before {
            background-color: ${theme.colors.primary_2};
          }
        }

        .settings {
          height: 100%;
          padding: 1rem;
        }
      }

      .settings {
        position: absolute;
        height: 0;
        width: 100%;
        background: white;
        top: calc(100% - 1px);
        border: 1px solid #dbdbdb;
        padding: 0 1rem;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        ${Transition()}
      }

      button {
        position: relative;
        left: 3px;
        width: 45px;
        height: 26px;
        padding: 3px;
        border: 1px solid ${theme.colors.grey_3};
        border-radius: 16px;
        cursor: pointer;
        outline: 0;
        background-color: ${theme.colors.white};
        transform: scale(${scaleSwitch});
        ${Transition('background', 0.3)};

        :before {
          content: '';
          display: block;
          width: 18px;
          height: 18px;
          background-color: ${theme.colors.grey_3};
          border-radius: 50%;
          transition: transform ${theme.transition.time}
              ${theme.transition.timeFunction},
            background ${theme.transition.time} ${theme.transition.timeFunction};
        }

        :hover {
          border: 1px solid ${theme.colors.primary_1};

          :before {
            background-color: ${theme.colors.primary_1};
          }
        }

        &.enabled {
          background-color: ${theme.colors.primary_1};
          border: 1px solid ${theme.colors.primary_1};
        }

        &.enabled:before {
          transform: translateX(20px);
          background-color: ${theme.colors.white};
        }
      }

      span {
        display: inline-block;
        margin: 0 8px;
        cursor: pointer;
        color: ${theme.colors.primary_1};

        ${fontSize &&
        css`
          font-size: ${fontSize};
        `}
      }
    `;
  }}
`;

export default Switch;
