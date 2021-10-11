import React, { useState, useEffect, useCallback, ReactNode } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DropResult } from 'react-beautiful-dnd';
import { Pathname, RouterProps, StateMapToPropsGlobal } from 'types';
import { reorder } from 'utils/js';
import { useSelector, useDispatch } from 'react-redux';
import { ShiftRegistrationActions } from 'store/ducks/shiftRegistration';

import dataPayload from 'constants/payload';
import api from 'services/api';
import InputList from 'components/Pages/InputList';
import Toast from 'components/Toast';
import Loading from 'components/Loading';
import DraggableList from './DraggableList';
import Instructions from './Instructions';
import { theme } from 'styles/theme';
import * as S from './styles';
import Form from './Form';
import { Typography } from '@material-ui/core';

const ShiftsRegistrationPage: React.FC = () => {
  const [data, setData] = useState<
    typeof dataPayload.shifts_registration | null
  >(null);
  const [newIndex, setNewIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { getList, toCancel } = ShiftRegistrationActions;
  const settings = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const shift = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'shiftRegistrationPage'>) =>
      state.shiftRegistrationPage
  );
  const router = useSelector((state: RouterProps) => state.router);

  const setShiftList = useCallback(
    (shiftList) => {
      if (shiftList.length > 0) {
        setData(shiftList);
      }
    },
    [setData]
  );

  useEffect(() => {
    if (!shift.shiftRegistrationList) {
      return;
    }
    setShiftList(shift.shiftRegistrationList);
  }, [shift, setShiftList]);

  useEffect(() => {
    api()
      .get(`${settings.building}`)
      .then((res: { data: any }) => {
        dispatch(getList(JSON.parse(JSON.stringify(res.data))));
      })
      .catch((_) => {
        // remover dispatch quando a requisição já estiver funcionando
        dispatch(getList(dataPayload.shifts_registration));
      });
  }, [settings.building, dispatch, getList]);

  let clearLoading: NodeJS.Timeout = 0 as unknown as NodeJS.Timeout;

  const handleSubmit = async (): Promise<any> => {
    const payload = shift.shiftRegistrationList;
    const time = 8000;
    try {
      setIsLoading(true);
      const { data } = await api('/').post('jarvis/api/shift/', payload);
      if (data.status_code === 200) {
        if (typeof data.message !== 'string') {
          clearLoading = setTimeout(() => {
            dispatch(toCancel(false));
            return <Toast type="success">cadastro efetuado com sucesso!</Toast>;
          }, time);
        } else {
          clearLoading = setTimeout(() => {
            return <Toast type="error">{data.message}</Toast>;
          }, time);
        }
      }
      if (data.status_code > 200) {
        clearLoading = setTimeout(() => {
          return <Toast type="error">{data.message}</Toast>;
        }, time);
      }
    } catch (err: any) {
      return <Toast type="error">{err}</Toast>;
    }
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!data || !destination) return;
    const newData = reorder(data, source.index, destination.index);

    setData(newData);
  };

  const addNewShift = () => {
    data ? setNewIndex(data.length + 1) : setNewIndex(1);
    shift.shiftCancel === true && dispatch(toCancel(false));
  };

  const handleCancel = () => {
    dispatch(toCancel(true));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <S.Main>
          <S.TopContent>
            <InputList
              pathname={router.location.pathname as Pathname}
              padding={`${theme.distance.normal}rem 0`}
            />
          </S.TopContent>
          <S.Content>
            <Instructions />
            <S.Shifts>
              {data && (
                <>
                  <S.IndexContent>
                    {data.map((_item, index) => (
                      <S.Index key={index}>
                        <span>{index + 1}</span>
                      </S.Index>
                    ))}
                  </S.IndexContent>
                  <DraggableList items={data} onDragEnd={onDragEnd} />
                </>
              )}
              {!data && (
                <S.Shift>
                  <Typography variant="h3">
                    Você não possui turnos cadastrados
                  </Typography>
                </S.Shift>
              )}
            </S.Shifts>
            {shift.shiftCancel === false && newIndex > 0 && (
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
                  <S.TrashButton
                    onClick={handleCancel}
                    style={{ marginLeft: 48 }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </S.TrashButton>
                </S.Shift>
              </S.Shifts>
            )}
            <S.SaveContent></S.SaveContent>
            <S.ButtonContent>
              <S.AddButton variant="contained" onClick={addNewShift}>
                Adicionar
              </S.AddButton>
              <S.SaveButton variant="contained" onClick={handleSubmit}>
                Salvar
              </S.SaveButton>
            </S.ButtonContent>
          </S.Content>
        </S.Main>
      )}
    </>
  );
};

export default ShiftsRegistrationPage;
