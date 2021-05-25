import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import * as Types from './types';
import * as S from './styles';

const Message: React.FC<Types.MessageProps<React.ReactNode>> = ({ isVisible = false, icon, description, title }) => {
  return (
    <>
      {isVisible && (
        <AnimatePresence>
          <S.Container>
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} transition={{ damping: 300 }}>
              <S.Content>
                {icon}
                <h2>{title}</h2>
                <div>{description}</div>
              </S.Content>
            </motion.div>
          </S.Container>
        </AnimatePresence>
      )}
    </>
  );
};

export default Message;
