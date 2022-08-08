import React from 'react';
import * as S from './styles';

interface ICard {
  title?: string;
  subtitle?: string;
  cardmargin?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const Card: React.FC<ICard> = ({ title, subtitle, cardmargin, children }) => {
  return (
    <S.MuiCard cardmargin={cardmargin}>
      <S.Font variant="h3" istitle={'true'}>
        {title}
      </S.Font>
      <S.Font variant="h5">{subtitle}</S.Font>
      <S.Margin />
      <>{children}</>
    </S.MuiCard>
  );
};

export default Card;
