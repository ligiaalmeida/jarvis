import React from 'react';
import * as S from './styles';

interface TextFieldProps {
  [key: string]: any;
}

const Input: React.FC<TextFieldProps> = ({ ...rest }) => {
  return <S.MuiTextField {...rest}></S.MuiTextField>;
};

export default Input;
