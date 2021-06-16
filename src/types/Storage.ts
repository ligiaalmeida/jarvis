export type LocalStorageGlobal = {
  settings: {
    isHeader: boolean;
    isNavigation: boolean;
  };
};

export type GlobalSessionStorage = {
  settings: {
    isActiveFullScreen: boolean;
  };
};

export type PagesSettingsStorage = {
  performance: {
    timer: PagesSettingsTimer;
    zoom: number;
  };
  current_faults: {
    timer: PagesSettingsTimer;
  };
};

export type PerformancePageStorage = {
  timer: PagesSettingsTimer;
  zoom: number;
};

export type RangeAutomaticTimer = 30 | 60 | 90 | 120;

export type PageStorageDefault = {
  timer: PagesSettingsTimer;
  modeView: 'simplified' | 'detailed';
};

export type PagesSettingsTimer = {
  automaticMode: boolean;
  timer: RangeAutomaticTimer;
};

export type StorageType = 'local' | 'session';

// export {};
