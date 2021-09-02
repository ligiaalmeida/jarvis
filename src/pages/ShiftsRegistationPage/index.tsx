import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DropResult } from 'react-beautiful-dnd';
import { Tooltip } from '@material-ui/core';
import { Pathname, RouterProps, StateMapToPropsGlobal, ShiftRegistrationFields } from 'types';
import { reorder } from 'utils/js';

import payload from 'constants/payload';
import api from 'services/api';
import InputList from 'components/Pages/InputList';
import DraggableList from './DraggableList';
import Instructions from './Instructions';
import { theme } from 'styles/theme';
import * as S from './styles';
import Form from './Form';

const INITIAL_INPUT_STATE = { shift_name: '', hour_start_shift: '', hour_end_shift: '' };

const ShiftsRegistrationPage: React.FC = () => {
  const [data, setData] = useState<typeof payload.shifts_registration>(null!);
  const [newIndex, setNewIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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
        // remover setData quando a requisição já estiver funcionando
        setData(dataPayload.shifts_registration);
        setIsError(true);
      });
  }, [settings.building, setIsError]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;
    const newData = reorder(data, source.index, destination.index);

    setData(newData);
  };

  const addNewShift = () => {
    setNewIndex(data.length + 1);
  };

  const clearLoading: NodeJS.Timeout = 0 as unknown as NodeJS.Timeout;

  return (
    <S.Main>
      <S.TopContent>
        <InputList pathname={router.location.pathname as Pathname} padding={`${theme.distance.normal}rem 0`} />
      </S.TopContent>
      <S.Content>
        <Instructions />
        <S.Shifts>
          <S.IndexContent>
            {data &&
              data.map((item, index) => (
                <S.Index key={index}>
                  <span>{index + 1}</span>
                </S.Index>
              ))}
          </S.IndexContent>
          {data && <DraggableList items={data} onDragEnd={onDragEnd} />}
        </S.Shifts>
        {newIndex > 0 && (
          <S.Shifts>
            <S.IndexContent>
              <S.Index>
                <span>{newIndex}</span>
              </S.Index>
            </S.IndexContent>
            <S.Shift>
              <S.Card>
                <Form />
              </S.Card>
            </S.Shift>
          </S.Shifts>
        )}
        <S.ButtonContent>
          <Tooltip arrow title="Adicionar horário" aria-label="adicionar horário">
            <S.AddButton onClick={addNewShift}>
              <FontAwesomeIcon icon={faPlus} size="2x" />
            </S.AddButton>
          </Tooltip>
        </S.ButtonContent>
      </S.Content>
    </S.Main>
  );
};

export default ShiftsRegistrationPage;
