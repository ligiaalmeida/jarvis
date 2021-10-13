import React from 'react';
import { motion } from 'framer-motion';

import * as Types from './types';

export const BottomToTop: React.FC<Types.AChartProps> = ({
  children,
  classes,
  active,
  idItem,
}) => {
  return (
    <>
      {active === idItem && (
        <motion.div
          id={`chart-id-${idItem}`}
          className={`content-tab-${classes}`}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            height: '100%',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
