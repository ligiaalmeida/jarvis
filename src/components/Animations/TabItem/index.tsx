import React from 'react';
import { motion } from 'framer-motion';

import * as Types from './types';
import { theme } from 'styles/theme';

export const TabItem: React.FC<Types.ATabItemProps> = ({
  children,
  active,
  idItem,
}) => {
  return (
    <motion.div
      style={{
        borderRadius: '8px 8px 0 0',
        padding: '1rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      initial={{
        height: '5.5rem',
        backgroundColor: theme.colors.primary_2,
      }}
      animate={{
        height: active === idItem ? '7rem' : '5.5rem',
        backgroundColor:
          active === idItem ? theme.colors.primary_2 : theme.colors.primary_1,
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
