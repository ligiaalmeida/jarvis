import { CircularProgress } from '@material-ui/core';
import React from 'react';
import * as S from './styles';

interface IButton {
  label?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  margintop?: string;
}
interface ButtonProps {
  [key: string]: any;
}

const Button: React.FC<IButton & ButtonProps> = ({
  label,
  margintop,
  isLoading,
  ...rest
}) => {
  return (
    <S.MuiButton margintop={margintop} {...rest}>
      {isLoading ? <CircularProgress /> : label}
    </S.MuiButton>
  );
};

export default Button;
