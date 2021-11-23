import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import * as S from './styles';

const Instructions = () => {
  return (
    <S.Instructions boxShadow={1}>
      <S.Alert>
        <span>
          <FontAwesomeIcon icon={faExclamationCircle} />
        </span>
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
