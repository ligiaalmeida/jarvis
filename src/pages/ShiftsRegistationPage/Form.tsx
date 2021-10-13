import React, { useState, useMemo } from 'react';
import { Formik, FormikValues } from 'formik';
import { FormControl, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {
  ShiftRegistrationFields,
  ShiftRegistrationType,
  StateMapToPropsGlobal,
} from 'types';
import shiftRegistration, {
  ShiftRegistrationActions,
} from 'store/ducks/shiftRegistration';
import * as S from './styles';

interface FormProps {
  register?: ShiftRegistrationFields;
}

const HourValidationSchema = object().shape({
  shift_name: string().required('Preenchimento obrigatório'),
  hour_start_shift: string().required('Preenchimento obrigatório'),
  hour_end_shift: string().required('Preenchimento obrigatório'),
});

const Form: React.FC<FormProps> = ({ register }) => {
  const [edit, setEdit] = useState<boolean>(true);
  const [save, setSave] = useState<boolean>(false);

  const shift = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'shiftRegistrationPage'>) =>
      state.shiftRegistrationPage
  );

  const { getList, toCancel } = ShiftRegistrationActions;
  const dispatch = useDispatch();

  const initialValues = useMemo(() => {
    if (register) {
      return {
        ...register,
        id_shift: register.id_shift,
        shift_name: register.shift_name,
        hour_start_shift: register.hour_start_shift,
        hour_end_shift: register.hour_end_shift,
      };
    }
    return {
      shift_name: '',
      hour_start_shift: '',
      hour_end_shift: '',
    };
  }, [register]);

  const handleEdit = () => {
    setEdit(!edit);
    setSave(true);
  };

  const handleSubmit = (values: FormikValues) => {
    const objIndex = shift.shiftRegistrationList.findIndex(
      (obj) => obj.id_shift === values.id_shift
    );
    if (objIndex < 0) {
      const newShift: ShiftRegistrationType = {
        id_shift: uuidv4(),
        shift_name: values.shift_name,
        hour_start_shift: values.hour_start_shift,
        hour_end_shift: values.hour_end_shift,
      };
      dispatch(getList([...shift.shiftRegistrationList, newShift]));
      dispatch(toCancel(true));
    } else {
      shift.shiftRegistrationList[objIndex] = {
        id_shift: values.id_shift,
        shift_name: values.shift_name,
        hour_start_shift: values.hour_start_shift,
        hour_end_shift: values.hour_end_shift,
      };
    }

    setEdit(!edit);
    setSave(!save);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={HourValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        touched,
        errors,
        handleBlur,
      }): React.ReactElement => {
        const nameError =
          errors.shift_name && touched.shift_name ? errors.shift_name : null;
        const hourStartError =
          errors.hour_start_shift && touched.hour_start_shift
            ? errors.hour_start_shift
            : null;
        const hourEndError =
          errors.hour_end_shift && touched.hour_end_shift
            ? errors.hour_end_shift
            : null;

        return (
          <S.FormikForm>
            <FormControl>
              <S.InputText
                error={Boolean(nameError)}
                id="shift_name"
                label="Nome"
                defaultValue={values.shift_name}
                helperText={nameError}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                name="shift_name"
                disabled={edit}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: '2rem' },
                }}
              />
            </FormControl>
            <S.InputText
              error={Boolean(hourStartError)}
              label="Hora inicial"
              defaultValue={values.hour_start_shift}
              helperText={hourStartError}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              name="hour_start_shift"
              id="hour_start_shift"
              disabled={edit}
              variant="standard"
              type="time"
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '2rem' },
              }}
            />
            <S.InputText
              error={Boolean(hourEndError)}
              label="Hora final"
              defaultValue={values.hour_end_shift}
              helperText={hourEndError}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              name="hour_end_shift"
              id="hour_end_shift"
              disabled={edit}
              variant="standard"
              type="time"
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '2rem' },
              }}
            />
            <S.FormActions>
              {edit && !save && (
                <IconButton onClick={() => handleEdit()}>
                  <FontAwesomeIcon icon={faPen} />
                </IconButton>
              )}
              {save && (
                <>
                  <IconButton type="submit">
                    <FontAwesomeIcon icon={faSave} />
                  </IconButton>
                </>
              )}
            </S.FormActions>
          </S.FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
