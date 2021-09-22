import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { theme } from 'styles/theme';
import * as S from './styles';

const Instructions = () => {
  return (
    <S.Instructions>
      <S.Alert>
        <span
          style={{ color: theme.colors.alert, fontSize: 40, paddingRight: 8 }}
        >
          <FontAwesomeIcon icon={faExclamationCircle} />
        </span>
        <Typography variant="h4">Atenção</Typography>
      </S.Alert>
      <ul>
        <li>
          Ao cadastrar os seus turnos, cuidado para não deixar lacunas no seu
          dia de trabalho. Cadastre todos os horários.
        </li>
        <li>Não cadastrar um horário já compreendido em outro turno.</li>
        <li>O início de um turno tem que ser o fim de outro turno.</li>
        <li>Os turnos têm que estar cadastrados na ordenação correta.</li>
      </ul>
    </S.Instructions>
  );
};

export default Instructions;
