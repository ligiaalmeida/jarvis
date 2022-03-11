import { Typography } from '@material-ui/core';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import * as S from './styles';
import { theme } from 'styles/theme';

const Instructions = () => {
  return (
    <S.Instructions boxShadow={1}>
      <S.Alert>
        <div>
          <PriorityHighRoundedIcon />
        </div>
        <Typography variant="h4">Atenção</Typography>
      </S.Alert>
      <ul>
        <li>Cadastre todos os horários.</li>
        <li>Não cadastrar um horário já compreendido em outro turno.</li>
        <li>Os turnos deverão estar cadastrados na ordenação correta.</li>
      </ul>
    </S.Instructions>
  );
};

export default Instructions;
