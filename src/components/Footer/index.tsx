import React from 'react';

import pkg from '../../../package.json';

import * as S from './styles';

const Footer = () => {
  return (
    <S.Footer>
      <p>
        Just A Rather Very Intelligent System (J.A.R.V.I.S.) <span>Versão {pkg.version}</span>
      </p>
    </S.Footer>
  );
};

export default Footer;
