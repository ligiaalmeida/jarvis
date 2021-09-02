import React, { useState, useMemo } from 'react';
import { Formik, FormikValues } from 'formik';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPen } from '@fortawesome/free-solid-svg-icons';
import api from 'services/api';
import { ShiftRegistrationFields } from 'types';
import * as S from './styles';

interface FormProps {
  register?: ShiftRegistrationFields;
}

const Form: React.FC<FormProps> = ({ register }) => {
  const [edit, setEdit] = useState<boolean>(true);
  const [save, setSave] = useState<boolean>(false);

  const initialValues = useMemo(() => {
    if (register) {
      return {
        ...register,
        shift_name: register.shift_name,
        hour_start_shift: register.hour_start_shift,
        hour_end_shift: register.hour_end_shift,
      };
    }
    return {
      id_shift: null,
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
    console.log('values', values);
    // const { data } = await api('/').post('jarvis/api/shift_registration', values);
    setEdit(!edit);
    setSave(!save);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, touched, errors, handleBlur }): React.ReactElement => {
        const nameError = errors.shift_name && touched.shift_name ? errors.shift_name : null;
        const hourStartError = errors.hour_start_error && touched.hour_start_error ? errors.hour_start_error : null;
        const hourEndError = errors.hour_end_error && touched.hour_end_error ? errors.hour_end_error : null;

        return (
          <S.FormikForm>
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
            />
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
            />
            <S.FormActions>
              {edit && !save && (
                <IconButton onClick={() => handleEdit()}>
                  <FontAwesomeIcon icon={faPen} />
                </IconButton>
              )}
              {save && (
                <IconButton type="submit">
                  <FontAwesomeIcon icon={faSave} />
                </IconButton>
              )}
            </S.FormActions>
          </S.FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
