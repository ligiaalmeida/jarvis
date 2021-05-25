import { Locale, NumberFormatType } from 'types/Global';

type NumberFormatProps = {
  value: number;
  locale: Locale;
  options: {
    style: NumberFormatType;
    maximumFractionDigits: number;
  };
};

export const numberFormat = ({ value, locale = 'pt-BR', options }: NumberFormatProps) => {
  return new Intl.NumberFormat(locale, { ...options }).format(value);
};
