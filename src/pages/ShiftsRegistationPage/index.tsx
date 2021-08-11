import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faGripVertical, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Draggable, DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  ListItemSecondaryAction,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Pathname, RouterProps, StateMapToPropsGlobal } from 'types';
import { theme } from 'styles/theme';
import payload from 'constants/payload';
import api from 'services/api';
import InputList from 'components/Pages/InputList';
import * as S from './styles';

interface ShiftRegistrationProps {
  name: string;
  hourStart: string;
  hourEnd: string;
}

export type DraggableListProps = {
  items: ShiftRegistrationProps[];
  onDragEnd: OnDragEndResponder;
};

const ShiftsRegistrationPage: React.FC<ShiftRegistrationProps> = () => {
  const [data, setData] = useState<typeof payload.shifts_registration>(null!);
  const [name, setName] = useState<string>('');
  const [hourStart, setHourStart] = useState<string>('');
  const [hourEnd, setHourEnd] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newRequest, setNewRequest] = useState<boolean>(false);

  const dataPayload = payload;

  const settings = useSelector((state: Pick<StateMapToPropsGlobal, 'global'>) => state.global);
  const router = useSelector((state: RouterProps) => state.router);

  useEffect(() => {
    api()
      .get(`${settings.building}_shifts_registration`)
      .then((res) => {
        setData(JSON.parse(JSON.stringify(res.data)));
        setIsError(false);
      })
      .catch((_) => {
        setIsError(true);
      });
  }, [settings.building, setIsError, newRequest]);
  return (
    <S.Main>
      <S.TopContent>
        <InputList pathname={router.location.pathname as Pathname} padding={`${theme.distance.normal}rem 0`} />
      </S.TopContent>
      <S.Content>
        <S.Instructions>
          <S.Alert>
            <span style={{ color: theme.colors.alert, fontSize: 40, paddingRight: 8 }}>
              <FontAwesomeIcon icon={faExclamationCircle} />
            </span>
            <Typography variant="h4">Atenção</Typography>
          </S.Alert>
          <ul>
            <li>
              Ao cadastrar os seus turnos, cuidado para não deixar lacunas no seu dia de trabalho. Cadastre todos os
              horários.
            </li>
            <li>Não cadastrar um horário já compreendido em outro turno.</li>
            <li>O início de um turno tem que ser o fim de outro turno.</li>
            <li>Os turnos têm que estar cadastrados na ordenação correta.</li>
          </ul>
        </S.Instructions>
        {dataPayload.shifts_registration.map((item, index) => (
          <S.Shifts key={index}>
            <S.IndexContent>
              <S.Index>
                <span>{index + 1}</span>
              </S.Index>
            </S.IndexContent>
            <S.Shift>
              <S.Card>
                <TextField
                  label="Nome"
                  required
                  name="name"
                  value={item.shift_name}
                  disabled={isEdit}
                  onChange={(e) => setName(e.target.value)}
                  variant="standard"
                />
                <TextField
                  label="Hora inicial"
                  required
                  name="hourStart"
                  disabled={isEdit}
                  value={item.hour_start_shift}
                  onChange={(e) => setHourStart(e.target.value)}
                  variant="standard"
                />
                <TextField
                  label="Hora final"
                  required
                  name="hourEnd"
                  disabled={isEdit}
                  value={item.hour_end_shift}
                  onChange={(e) => setHourEnd(e.target.value)}
                  variant="standard"
                />
                <CardActions>
                  <IconButton onClick={() => setIsEdit(!isEdit)}>
                    <FontAwesomeIcon icon={faPen} />
                  </IconButton>
                  <IconButton onClick={() => setIsEdit(!isEdit)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </CardActions>
              </S.Card>
            </S.Shift>
            <S.Shift>
              <Tooltip arrow title="Arraste para mover" aria-label="Arraste para mover">
                <S.DragButton onClick={() => setIsEdit(!isEdit)}>
                  <FontAwesomeIcon icon={faGripVertical} />
                </S.DragButton>
              </Tooltip>
            </S.Shift>
          </S.Shifts>
        ))}
        <S.ButtonContent>
          <Tooltip arrow title="Adicionar horário" aria-label="adicionar horário">
            <S.AddButton>
              <FontAwesomeIcon icon={faPlus} size="2x" />
            </S.AddButton>
          </Tooltip>
        </S.ButtonContent>
      </S.Content>
    </S.Main>
  );
};

export default ShiftsRegistrationPage;
