import { format as dataFnsFormat } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

type DisplayDateProps = {
  date: string;
  format: 'MMMM/yyyy' | 'yyyy/MM/dd' | 'dd/MM/yyyy';
};

export const displayDate = ({ date, format }: DisplayDateProps) => {
  return dataFnsFormat(
    new Date(
      Number(date.split('-')[0]),
      Number(date.split('-')[1]) - 1,
      Number(date.split('-')[2])
    ),
    format,
    {
      locale: ptBr,
    }
  );
};
