import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from 'components/Layout';

import { SignInActions } from 'store/ducks/auth';
import api from 'services/api';

import Logo from 'assets/img/login_logo.png';

import * as S from './styles';
import { Polices } from '../../types';
import Card from '../../components/Card';
import { Grid } from '@material-ui/core';
import { Formik, Form, FormikValues } from 'formik';
import * as yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { theme } from 'styles/theme';

const SignInPage = () => {
  const formRef = useRef(null);
  const [messageError, setMessageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const { polices, isLogin } = SignInActions;
  const dispatch = useDispatch();

  let clearLoading: NodeJS.Timeout = 0 as unknown as NodeJS.Timeout;

  const handleSubmit = async (formData: FormikValues) => {
    const time = 800;
    const payload = {
      user: formData.user,
      pwd: formData.pwd,
    };

    try {
      setIsLoading(true);
      const { data } = await api('/').post('jarvis/api/auth', payload);
      if (data.status_code === 200) {
        if (typeof data.message !== 'string') {
          clearLoading = setTimeout(() => {
            dispatch(isLogin(true));
            dispatch(polices(data.message.auth));
            setIsLoading(false);
            history.push(
              `/${(data.message.auth[0] as Polices).menu_item[0].name}`
            ); // envia o user pra linha vinda do back
          }, time);
        } else {
          clearLoading = setTimeout(() => {
            setMessageError(data.message);
            setIsLoading(false);
          }, time);
        }
      }
      if (data.status_code > 200) {
        clearLoading = setTimeout(() => {
          setMessageError(data.message);
          setIsLoading(false);
        }, time);
      }
    } catch (err) {
      console.log('Erro:', err);
      setIsLoading(false);
    }
  };

  const validationSchema = yup.object().shape({
    user: yup.string().required('Preenchimento obrigatório'),
    pwd: yup.string().required('Preenchimento obrigatório'),
  });

  return (
    <S.LoginBackground>
      <S.Logo
        src={Logo}
        alt="Texto com a marca MB-Jarvis"
        onDragStart={(e) => e.preventDefault()}
      />
      <Card
        title="Área Restrita"
        subtitle="Preencha as informações abaixo para acessar."
        cardmargin="20px 35%"
      >
        <Formik
          initialValues={{
            user: '',
            pwd: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, touched, errors }) => (
            <Form ref={formRef}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <S.Font variant="h5">Usuário</S.Font>
                  <Input
                    id="user"
                    name="user"
                    type="text"
                    onChange={handleChange}
                    placeholder="Insira aqui seu usuário"
                    variant="outlined"
                    fullWidth
                  />
                  {errors.user && touched.user && (
                    <S.Font variant="h6" fontcolor={theme.colors.red_2}>
                      {errors.user}
                    </S.Font>
                  )}
                </Grid>
                <Grid item>
                  <S.Font variant="h5">Senha</S.Font>
                  <Input
                    id="pwd"
                    name="pwd"
                    type="password"
                    onChange={handleChange}
                    placeholder="Insira aqui sua senha"
                    variant="outlined"
                    fullWidth
                  />
                  {errors.pwd && touched.pwd && (
                    <S.Font variant="h6" fontcolor={theme.colors.red_2}>
                      {errors.pwd}
                    </S.Font>
                  )}
                </Grid>
              </Grid>
              <S.FormContent>
                <AnimatePresence>
                  {messageError && !isLoading && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ damping: 300, duration: 0.4 }}
                    >
                      <Container
                        flexDirection="column"
                        className="sign-in__form-group sign-in__form-group--message"
                        xs={16}
                        padding={{ xs: [0, 0, 0, 0, 'px'] }}
                      >
                        <span>{messageError}</span>
                      </Container>
                    </motion.div>
                  )}
                </AnimatePresence>
              </S.FormContent>
              <Button
                variant="contained"
                size="large"
                label="ENTRAR"
                type="submit"
                margintop="30px"
                disabled={isLoading}
                isLoading={isLoading}
                fullWidth
              />
            </Form>
          )}
        </Formik>
      </Card>
    </S.LoginBackground>
  );
};

export default SignInPage;
