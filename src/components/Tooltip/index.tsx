import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import TooltipIcon from 'components/Icons/Tooltip';
import { useClickOutside } from 'hooks';
import { Container, ContainerIcon, ContainerTooltip } from 'components/Tooltip/style';

import * as Types from './types';

const variants = {
  closed: {
    opacity: 0,
    height: 0,
    y: '10px',
    x: 'calc(-100% - 15px)',
  },
  open: {
    opacity: 1,
    y: '10px',
    x: 'calc(-100% - 15px)',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
  finished: {
    height: 'auto',
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const Tooltip = ({
  description,
  xPosition,
  yPosition,
  bgColorIcon,
  classNameContainerTooltip,
  classNameContainerIcon,
}: Types.TooltipProps<React.ReactNode>) => {
  const [isToggled, setIsToggled] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);

  const customVariants = {
    ...variants,
    closed: {
      ...variants.closed,
      x: xPosition || 'calc(-100% - 15px)',
      y: yPosition || '10px',
    },
    open: {
      ...variants.open,
      x: xPosition || 'calc(-100% - 15px)',
      y: yPosition || '10px',
    },
  };

  useClickOutside(ref, () => {
    if (isToggled) setIsToggled((prevState) => !prevState);
  });

  return (
    <Container classNameContainerIcon={classNameContainerIcon}>
      <ContainerIcon onClick={() => setIsToggled((prevState) => !prevState)}>
        <TooltipIcon background={bgColorIcon} />
      </ContainerIcon>
      <AnimatePresence>
        {isToggled && (
          <ContainerTooltip
            classNameContainerTooltip={classNameContainerTooltip}
            ref={ref}
            variants={customVariants}
            initial="closed"
            animate="open"
            exit="finished"
            countCharacters={typeof description === 'string' ? (description as string).length : 0}
          >
            <div>{description}</div>
          </ContainerTooltip>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Tooltip;
