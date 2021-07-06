import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, Row } from 'components/Layout';
import Ring from 'components/Icons/Loaders/Ring';

import { SignInActions } from 'store/ducks/auth';
import api from 'services/api';

import Logo from 'assets/img/logo-jarvis.png';

import texts from './texts';

import * as S from './styles';
import Footer from '../../components/Footer';
import { Polices } from '../../types';

const INITIAL_INPUT_STATE = { user: '', pwd: '' };

const SignInPage = () => {
  const [messageError, setMessageError] = useState('');
  const [eachEntry, setEachEntry] = useState(INITIAL_INPUT_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const { polices, isLogin } = SignInActions;
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  let clearLoading: NodeJS.Timeout = 0 as unknown as NodeJS.Timeout;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const time = 800;

    try {
      setIsLoading(true);
      const { data } = await api('/').post('jarvis/api/auth', eachEntry);

      if (data.status_code === 200) {
        if (typeof data.message !== 'string') {
          clearLoading = setTimeout(() => {
            dispatch(polices(data.message.auth));
            dispatch(isLogin(true));
            setIsLoading(false);
            history.push(`/${(data.message.auth[0] as Polices).menu_item[0].name}`); // envia o user pra linha vinda do back
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

  return (
    <S.ContainerWrapper>
      <Row className="sign-in__row-container">
        <Container xs={9} lg={10} className="sign-in__img-hero" />

        <Container xs={7} lg={6} className="sign-in__form">
          <Row flexDirection="column" className="sign-in__row-content">
            <Container padding={{ xs: [0, 0, 0, 0, 'px'] }} className="sign-in__content">
              <img src={Logo} alt="Texto com a marca MB-Jarvis" onDragStart={(e) => e.preventDefault()} />
              <S.BlueBox />
              <S.FormContent>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Container xs={13} lg={10} className="sign-in__form-content">
                    <h1>{texts.title.pt_br}</h1>
                    <p>{texts.description.pt_br}</p>

                    <form onSubmit={handleSubmit}>
                      <Container
                        padding={{ xs: [0, 0, 0, 0, 'px'] }}
                        flexDirection="column"
                        className="sign-in__form-group"
                        xs={16}
                      >
                        <label htmlFor="user">{texts.form.user.label.pt_br}</label>
                        <input
                          id="user"
                          type="text"
                          name="user"
                          value={eachEntry.user}
                          placeholder={texts.form.user.placeholder.pt_br}
                          onChange={(e) => {
                            if (messageError) setMessageError('');
                            handleInputChange(e);
                          }}
                        />
                      </Container>

                      <Container flexDirection="column" className="sign-in__form-group" xs={16}>
                        <label htmlFor="password">{texts.form.password.name.pt_br}</label>
                        <input
                          type="password"
                          id="password"
                          name="pwd"
                          value={eachEntry.pwd}
                          placeholder={texts.form.password.placeholder.pt_br}
                          onChange={(e) => {
                            if (messageError) setMessageError('');
                            handleInputChange(e);
                          }}
                        />
                      </Container>

                      <AnimatePresence>
                        {messageError && (
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

                      <button type="submit">
                        {!isLoading && texts.form.button.pt_br}
                        {isLoading && <Ring width={32} borderWidth={3} />}
                      </button>
                    </form>
                  </Container>
                </motion.div>
              </S.FormContent>
            </Container>
          </Row>
          <Footer />
        </Container>
      </Row>
    </S.ContainerWrapper>
  );
};

export default SignInPage;
