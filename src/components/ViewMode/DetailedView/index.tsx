import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import * as S from './styles';

const variant = {
  closed: {
    opacity: 0,
    height: 0,
    y: '20px',
  },
  open: {
    opacity: 1,
    y: '-6px',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
  finished: {
    opacity: 0,
    height: 0,
    y: '20px',
    x: '10px',
    transition: {
      duration: 0.4,
    },
  },
};

const DetailedView: React.FC = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={variant}
        initial="closed"
        animate="open"
        exit="finished"
      >
        <S.Container>
          <S.RowStations>{children}</S.RowStations>
        </S.Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default DetailedView;
