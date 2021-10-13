import { createMuiTheme } from '@material-ui/core/styles';

import { theme } from 'styles/theme/index';

export const muiTheme = createMuiTheme({
  typography: {
    fontFamily: "'DaimlerRegular', sans-serif",
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
      },
    },
    MuiSlider: {
      valueLabel: {
        fontSize: 12,
      },
      thumb: {
        color: theme.colors.primary_1,
      },
      markLabel: {
        fontSize: '1.075rem',
        color: theme.colors.primary_1,
      },
      markLabelActive: {
        color: theme.colors.primary_1,
        fontWeight: 'bold',
      },
      track: {
        color: theme.colors.primary_1,
        fontSize: 20,
      },
      rail: {
        color: theme.colors.primary_2,
        fontSize: 20,
      },
    },
    MuiPaper: {
      elevation8: {
        border: `1px solid ${theme.colors.grey_5}`,
        boxShadow: '1px 3px 4px 0px rgba(0, 0, 0, 0.1)',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '1.4rem',
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: theme.colors.grey_6,
          '&&:hover': {
            backgroundColor: theme.colors.grey_6,
          },
        },
      },
      button: {
        '&:hover': {
          backgroundColor: theme.colors.grey_6,
        },
      },
    },
    MuiSelect: {
      root: {},
      icon: {
        right: '1rem',
        fontSize: '2.5rem',
        transition: 'transform 0.3s ease-in-out',
      },
      selectMenu: {
        minHeight: '3rem',
      },
      select: {
        border: `1px solid ${theme.colors.grey_4}`,
        fontSize: '1.6rem',
        padding: '4px 30.5px 4px 8px',
        borderRadius: '4px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.4s ease-in-out',
        '&&:focus': {
          backgroundColor: 'transparent',
          borderRadius: '4px',
          border: `1px solid ${theme.colors.primary_1}`,
        },
        '&&:hover': {
          borderColor: `${theme.colors.primary_1}`,
        },
      },
      outlined: {
        border: 0,
      },
    },
    MuiTouchRipple: {
      child: {
        color: theme.colors.white,
        backgroundColor: theme.colors.primary_1,
      },
      rippleVisible: {
        opacity: 0.5,
        animation: `$enter 550ms ease-in-out`,
      },
    },
    MuiInput: {
      root: {
        width: '14rem',
        maxWidth: '14rem',
      },
      underline: {
        '&::after': {
          border: 0,
        },
        '&::before': {
          border: 0,
        },
        '&&:hover': {
          '&::before': {
            border: 0,
          },
        },
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: '1.2rem',
      },
    },
  },
});
