export default {
  closed: {
    opacity: 0,
    y: 50,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  finished: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const variantMessageError = {
  open: { height: 'auto', y: 0 },
  closed: { height: 0, y: -20 },
};

export const presenceBottomToTop = {
  closed: {
    opacity: 0,
    height: 0,
    y: '20px',
    x: '10px',
  },
  open: {
    opacity: 1,
    y: '-6px',
    x: '10px',
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
