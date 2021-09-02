import styled, { css } from 'styled-components';
import { Transition } from 'utils/styles/mixins';
import { Form } from 'formik';
import { Fab, Card as MuiCard, IconButton, CardActions as MuiCardActions, TextField } from '@material-ui/core';

export const Main = styled.main`
  ${(props) => {
    const { theme } = props;

    return css`
      background-color: ${theme.colors.grey_6};
      position: relative;
      padding: 0 ${theme.distance.normal}rem ${(theme.unit * 7) / 10}rem;
    `;
  }};
`;

export const Content = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      ${Transition()}

      ${theme.breakpoints.default('max').md(css`
        flex-direction: column;
      `)}
    `;
  }};
`;

export const TopContent = styled.div`
  align-items: center;
  display: flex;
  height: 6rem;
  justify-content: flex-end;
  margin-right: -2.4rem;
`;

export const Instructions = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      align-items: flex-start;
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 2.4rem;
      width: 915px;

      li {
        color: ${theme.colors.grey_1};
        font-family: 'DaimlerRegular', sans-serif;
        font-size: 1.8rem;
        margin-right: 1rem;
      }
    `;
  }}
`;

export const Shifts = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 915px;
`;

export const Shift = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Alert = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const IndexContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  margin-right: 3rem;
  width: 60px;
`;

export const Index = styled.span`
  ${(props) => {
    const { theme } = props;

    return css`
      height: 60px;
      width: 60px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: ${theme.colors.grey_4};

      span {
        font-family: ${theme.typography.family.title};
        font-size: 2.2rem;
        font-weight: ${theme.typography.weight.bold};
        color: ${theme.colors.white};
        text-align: center;
      }
    `;
  }}
`;

export const ButtonContent = styled.div`
  ${(props) => {
    const { theme } = props;
    return css`
      position: fixed;
      width: 100%;
      display: inline-block;
      bottom: ${(theme.unit * 7) / 10}rem;
      padding: 0 ${theme.distance.normal}rem;
    `;
  }}
  clear: both;
`;

export const AddButton = styled(Fab)`
  ${(props) => {
    const { theme } = props;
    return css`
      float: right;
      && {
        color: ${theme.colors.white};
        background-color: ${theme.colors.primary_1};
        :hover {
          color: ${theme.colors.white};
          background-color: ${theme.colors.primary_2};
        }
      }
    `;
  }}
`;

export const DragButton = styled(IconButton)`
  && {
    border-radius: 3px;
    padding: 6px;
    margin: 12px;
    margin-top: 23px;
    svg {
      font-size: 1.2em;
    }
  }
`;

export const Card = styled(MuiCard)`
  ${(props) => {
    const { theme } = props;
    return css`
      display: flex;
      border-radius: 4px;
      padding: ${theme.distance.normal}rem;
      margin: ${theme.distance.normal}rem;
      label,
      input {
        font-size: 1.8rem;
        font-family: 'DaimlerRegular', sans-serif;
      }
    `;
  }}
`;

export const CardActions = styled(MuiCardActions)`
  display: flex;
  align-items: baseline !important;
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
`;

export const FormikForm = styled(Form)`
  display: flex;
  align-items: baseline;
`;

export const InputText = styled(TextField)`
  .MuiInputBase-input {
    line-height: 2rem;
  }
`;
