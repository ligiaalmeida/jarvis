import React from 'react';

import Logo from 'assets/img/logo-jarvis.png';
import * as S from './styles';

const Loading = () => {
  return (
    <S.Container>
      <img src={Logo} alt="Texto com a marca MB-Jarvis" />
    </S.Container>
  );
};

export default Loading;
