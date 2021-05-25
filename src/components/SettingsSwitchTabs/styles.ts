import styled, { css } from 'styled-components';
import { Centralized, Elevation, Transition } from 'utils/styles/mixins';

export const Label = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: ${theme.colors.primary_1};
      font-size: 1.4rem;

      span:nth-child(2) {
        min-width: 75px;
        font-size: 1.4rem;
        text-align: center;
        color: ${theme.colors.white};
        padding: 1px 1.5rem;
        border-radius: 4px;
        background-color: ${theme.colors.primary_1};
      }
    `;
  }};
`;

export const SliderContent = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 100%;
      padding: 0 1rem;

      .MuiSlider-markLabel {
        font-size: 1.2rem;
        // color: ${theme.colors.primary_1};
      }
    `;
  }};
`;

export const TimerContainer = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;

      :hover {
        background-color: ${theme.colors.grey_6};
      }

      input {
        width: 36px;
        outline: 0;
        padding: 3px;
        border-radius: 4px;
        border: 1px solid ${theme.colors.grey_3};
        text-align: center;
        color: ${theme.colors.primary_1};

        :focus {
          border: 1px solid ${theme.colors.primary_1};
        }
      }
    `;
  }};
`;

export const SettingsDrawer = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: absolute;
      top: 8px;
      right: 10px;
      width: 25rem;
      padding: 1rem 0;
      border-radius: 8px;
      background-color: ${theme.colors.white};
      ${Elevation(2)};
      z-index: 1;

      > div:first-child {
        padding: 1rem 1.5rem;

        span {
          margin-left: 0;
        }
      }
    `;
  }};
`;

export const IconSettings = styled.div`
  ${() => {
    return css`
      ${Centralized()};
      pointer-events: none;
    `;
  }};
`;

export const Settings = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 48px;
      min-height: 5.5rem;
      margin-left: 2px;
      background-color: ${theme.colors.primary_1};
      border-radius: 8px 8px 0 0;
      padding: 1rem;
      cursor: pointer;
      ${Transition('background-color')}

      :hover {
        background-color: ${theme.colors.primary_2};
      }
    `;
  }};
`;
