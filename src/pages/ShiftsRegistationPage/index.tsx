import React, { useState, useEffect } from 'react';

import { DropResult } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pathname, RouterProps, StateMapToPropsGlobal } from 'types';
import { reorder } from 'utils/js';
import { useSelector, useDispatch } from 'react-redux';
import { ShiftRegistrationActions } from 'store/ducks/shiftRegistration';

import api from 'services/api';
import InputList from 'components/Pages/InputList';
import Toast from 'components/Toast';
import Loading from 'components/Loading';
import DraggableList from './DraggableList';
import Instructions from './Instructions';
import { theme } from 'styles/theme';
import * as S from './styles';
import { Typography } from '@material-ui/core';
import Form from './Form';

const ShiftsRegistrationPage: React.FC = () => {
  const [newIndex, setNewIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { getList, cancelAddShift } = ShiftRegistrationActions;
  const settings = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const shift = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'shiftRegistrationPage'>) =>
      state.shiftRegistrationPage
  );
  const router = useSelector((state: RouterProps) => state.router);

  useEffect(() => {
    api()
      .get(`/shift/${settings.building}/get_shift_list`)
      .then((res: { data: any }) => {
        dispatch(getList(JSON.parse(JSON.stringify(res.data))));
      })
      .catch((error) => {
        return <Toast type="error">{error}</Toast>;
      });
  }, [settings.building, dispatch, getList]);

  const handleSubmit = async (): Promise<any> => {
    let clearLoading: NodeJS.Timeout = 0 as unknown as NodeJS.Timeout;
    const payload = shift.shiftRegistrationList;
    const time = 8000;
    try {
      setIsLoading(true);
      const { data } = await api().post(
        `/shift/${settings.building}/post_shift_list`,
        payload
      );
      if (data.status_code === 200) {
        if (typeof data.message !== 'string') {
          clearLoading = setTimeout(() => {
            return (
              <Toast type="success">
                cadastro de turnos efetuado com sucesso!
              </Toast>
            );
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
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      return <Toast type="error">{err}</Toast>;
    }
    dispatch(cancelAddShift(false));
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!shift.shiftRegistrationList || !destination) return;
    const newData = reorder(
      shift.shiftRegistrationList,
      source.index,
      destination.index
    );

    dispatch(getList(newData));
  };

  const addNewShift = () => {
    shift.shiftRegistrationList
      ? setNewIndex(shift.shiftRegistrationList.length + 1)
      : setNewIndex(1);
    dispatch(cancelAddShift(false));
  };
  const handleCancel = () => {
    dispatch(cancelAddShift(true));
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
              {shift.shiftRegistrationList &&
                shift.shiftRegistrationList.length > 0 && (
                  <>
                    <S.IndexContent>
                      {shift.shiftRegistrationList.map((_item, index) => (
                        <S.Index key={index}>
                          <span>{index + 1}</span>
                        </S.Index>
                      ))}
                    </S.IndexContent>
                    <DraggableList
                      items={shift.shiftRegistrationList}
                      onDragEnd={onDragEnd}
                    />
                  </>
                )}
              {!shift.shiftRegistrationList ||
                (shift.shiftRegistrationList.length <= 0 && (
                  <S.Shift>
                    <Typography variant="h3">
                      Você não possui turnos cadastrados
                    </Typography>
                  </S.Shift>
                ))}
            </S.Shifts>
            {!shift.cancelAddShift && newIndex > 0 && (
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
