import React from 'react';

import * as S from './styles';

type RingProps = {
  color?: string;
  width?: number;
  borderWidth?: number;
};

const Ring = ({ color, width, borderWidth }: RingProps) => {
  return (
    <S.Ring widthRing={width} borderWidthRing={borderWidth} colorRing={color}>
      <div />
      <div />
      <div />
      <div />
    </S.Ring>
  );
};

export default Ring;
