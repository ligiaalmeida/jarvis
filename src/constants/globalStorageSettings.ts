import { CurrentFaultsPageStorage, PagesSettingsStorage, PageStorageDefault, PerformancePageStorage } from 'types';

export const localStorageGlobal = {
  settings: {
    isHeader: true,
    isNavigation: true,
  },
};

export const pagesLocalStorage: PagesSettingsStorage = {
  performance: {
    timer: {
      automaticMode: false,
      timer: 30,
    },
    zoom: 0,
  },
  current_faults: {
    timer: {
      automaticMode: false,
      timer: 30,
    },
  },
};

export const performancePage: PerformancePageStorage = {
  timer: {
    automaticMode: false,
    timer: 30,
  },
  zoom: 0,
};

export const currentFaultsPage: Omit<CurrentFaultsPageStorage, 'stationActive'> = {
  timer: {
    automaticMode: false,
    timer: 30,
  },
  modeView: 'simplified',
};

export const pageStorageDefault: PageStorageDefault = {
  timer: {
    automaticMode: false,
    timer: 30,
  },
  modeView: 'simplified',
};

export const sessionStorage = {
  settings: {
    isActiveFullScreen: false,
  },
};
