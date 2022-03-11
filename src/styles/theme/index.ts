import { Theme, GridSizes } from 'types';
import { breakpoints, breakpointCustom } from './breakpoints';

const unit = 8;
export const sizes = {
  xs: { min: '0px', max: '599px' },
  sm: { min: '600px', max: '959px' },
  md: { min: '960px', max: '1279px' },
  lg: { min: '1280px', max: '1919px' },
  xl: { min: '1920px', max: '10000px' },
};
export const grid: GridSizes = [
  6.25, 12.5, 18.75, 25, 31.25, 37.5, 43.75, 50, 56.25, 62.5, 68.75, 75, 81.25,
  87.5, 93.75, 100,
];

export const theme: Theme = {
  unit,
  layout: {
    navigation: {
      height: {
        on: 140,
        off: 70,
      },
    },
    inputListToPage: {
      distance: {
        top: 2.2,
        bottom: 2.2,
        height: 88,
      },
    },
    nav_tabs: {
      header: {
        padding: {
          top: 20,
          bottom: 20,
        },
        height: 80,
      },
    },
    footer: {
      height: 50,
    },
  },
  colors: {
    primary_1: '#00677F',
    primary_2: '#5097AB',
    primary_3: '#E69123',
    primary_4: '#6EA046',
    primary_5: '#035A27',
    primary_6: '#7620BB',
    primary_7: '#21AFFF',
    primary_8: '#8D450C',
    primary_9: '#F38383',
    primary_10: '#80CB44',
    secondary_1: '#F06900',
    secondary_2: '#F0BE7D',
    tertiary_1: '#30600A',
    grey_1: '#4A4A4A',
    grey_2: '#6F6F6F',
    grey_3: '#94999C',
    grey_4: '#DBDBDB',
    grey_5: '#D8DDE6',
    grey_6: '#EFF3F8',
    grey_7: '#c0c5cb',
    grey_8: '#f4f6f9',
    grey_9: '#C8C8C8',
    grey_10: '#c6c6c6',
    grey_11: '#C7C7C7',
    grey_12: '#CCCCCC',
    grey_13: '#666666',
    grey_14: '#DDDDDD',
    grey_15: '#EEEEEE',
    grey_16: '#222222',
    red_1: '#791D1D',
    red_2: '#FF0000',
    white: '#FFF',
    black: '#000',
    blue_1: '#003340',
    yellow_1: '#F4EFD0',
    success: '#32B88B',
    error: '#D0021B',
    alert: '#FC9D0A',
    success_bg: '#CDDED4',
    error_bg: '#F9DBDF',
    alert_bg: '#FFF3CD',
    online_bg: '#ABE1FA',
    fails: {
      default: '#6EA046',
      empty: '#a2a2a2',
    },
  },
  gradient: {
    default: 'linear-gradient(180deg, #0F4C81 30%, #118aca 80%)',
    aijus: {
      background: 'linear-gradient(180deg, #0F4C81 30%, #118aca 80%)',
      menu: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 92.81%, #FFFFFF 92.91%, #FFFFFF 100%)',
    },
  },
  typography: {
    family: {
      text: `'DaimlerRegular', sans-serif`,
      subtitle: `'DaimlerRegular', sans-serif`,
      title: `'DaimlerBold', sans-serif`,
      alternative: `'DaimlerRegular', sans-serif`,
    },
    weight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    case: {
      capitalize: 'capitalize',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
    },
    lineHeight: '145%',
    size: {
      huge: '4rem', // 40
      big: '2.4rem', // 24
      title_1: '3rem', // 30
      title_2: '2rem', // 20
      title_3: '1.8rem', // 18
      normal: `1.6rem`, // 16
      small: '1.4rem', // 14
      tiny: '0.750rem', // 12
    },
    align: {
      left: 'left',
      center: 'center',
      right: 'right',
    },
    letterSpacing: {
      tight: '-.003em',
      normal: '0em',
      wide: '.003em',
      wider: '.2em',
    },
  },
  border: {
    size: {
      normal: '1px',
      big: '2px',
      stout: '3px',
    },
    radius: {
      none: '0px',
      normal: '4px',
      full: '50%',
    },
    shadow: {
      none: 'none',
      light: '0 8px 20px 0 #DBDBDB ',
      dark: '0 8px 8px 3px #DBDBDB ',
    },
  },
  distance: {
    tiny: 0.4,
    small: 1,
    normal: 2.4,
    big: 3.2,
    stout: 4.8,
  },
  transition: {
    time: '.2s',
    timeFunction: 'ease-in-out',
  },
  awesomegrid: {
    container: sizes,
    sizes: grid,
    gutterWidth: {
      xs: 1,
      sm: 1,
      md: 1.5,
      lg: 1.5,
      xl: 1.5,
    },
  },
  icons: {
    small: {
      width: '16px',
      height: '16px',
    },
    medium: {
      width: '32px',
      height: '32px',
    },
    big: {
      width: '48px',
      height: '48px',
    },
  },
  brands: {
    products: {
      width: '80px',
      height: '40px',
    },
    partners: {
      width: '120px',
      height: '88px',
    },
    semantix: {
      width: '131px',
      height: '30px',
    },
  },
  images: {
    cards: {
      width: '72px',
      height: '48px',
    },
    services: {
      width: '48px',
      height: '48px',
    },
  },
  mapRange: [
    '#0F4C81',
    '#118ACA',
    '#31B1FF',
    '#ABE1FA',
    '#EFF3F8',
    '#ffffbf',
    '#fee090',
    '#fdae61',
    '#FC9D0A',
    '#d73027',
    '#D0021B',
  ],
  breakpoints: {
    default: breakpoints,
    custom: breakpointCustom,
    keySizes: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
  },
};
