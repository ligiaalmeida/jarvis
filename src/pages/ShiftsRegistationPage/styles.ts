import styled, { css } from 'styled-components';
import { Transition } from 'utils/styles/mixins';
import { Form } from 'formik';
import {
  Card as MuiCard,
  Button,
  IconButton,
  CardActions as MuiCardActions,
  TextField,
  Box,
} from '@material-ui/core';

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

export const Instructions = styled(Box)`
  ${(props) => {
    const { theme } = props;

    return css`
      align-items: center;
      background: ${theme.colors.white};
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 2.4rem;
      padding: 2rem;

      ul {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        margin: 1rem;
      }

      li {
        color: ${theme.colors.grey_1};
        font-family: 'DaimlerRegular', sans-serif;
        font-size: 1.8rem;
        text-decoration: none;
      }
    `;
  }}
`;

export const Shifts = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const Shift = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Alert = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;

      div {
        align-items: center;
        background-color: ${theme.colors.alert};
        border-radius: 50%;
        display: flex;
        height: ${theme.unit * 5}px;
        justify-content: center;
        margin-right: ${theme.unit}px;
        padding-left: 2px;
        width: ${theme.unit * 5}px;

        svg {
          vertical-align: super;
          color: ${theme.colors.white};
          font-size: ${theme.unit * 4}px;
        }
      }
    `;
  }}
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
      background-color: ${theme.colors.grey_1};

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
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: ${(theme.unit * 7) / 10}rem;
      padding: 0 ${theme.distance.normal}rem;
    `;
  }}
`;

export const AddButton = styled(Button)`
  ${(props) => {
    const { theme } = props;
    return css`
      && {
        background-color: ${theme.colors.white};
        border: 1px solid ${theme.colors.primary_1};
        font-size: 1.6rem;
        color: ${theme.colors.primary_1};
        margin: ${theme.distance.normal}rem;
      }
    `;
  }}
`;

export const DivActions = styled.div`
  display: flex;
  flex-directions: row;
  align-items: baseline;
  justify-content: center;
`;

export const DragButton = styled(IconButton)``;

export const TrashButton = styled(IconButton)`
  && {
    margin: 12px 0;
    margin-top: 23px;
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
      width: 505px;
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

interface TextFieldProps {
  error: boolean;
  id: string;
  label: string;
  defaultValue: string;
  helperText: Node;
  onChange: () => void;
  onBlur: () => void;
  required: boolean;
  name: string;
  disabled: boolean;
  variant: string;
  type: string;
  InputLabelProps: any;
}

export const InputText = styled(TextField).attrs((props: TextFieldProps) => ({
  helperText: props.helperText,
}))`
  .MuiInputBase-input {
    font-size: 2rem;
    line-height: 2rem;
    width: 92%;
  }
`;

export const SaveContent = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 450px;
`;

export const SaveButton = styled(Button)`
  ${(props) => {
    const { theme } = props;
    return css`
      && {
        background-color: ${theme.colors.primary_1};
        font-size: 1.6rem;
        color: ${theme.colors.white};
        margin: ${theme.distance.normal}rem;
        :hover {
          background-color: ${theme.colors.primary_2};
        }
      }
    `;
  }}
`;
