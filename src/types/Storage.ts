type LocalStorageGlobal = {
  settings: {
    isHeader: boolean;
    isNavigation: boolean;
  };
};

type GlobalSessionStorage = {
  settings: {
    isActiveFullScreen: boolean;
  };
};

type PagesSettingsStorage = {
  performance: {
    timer: PagesSettingsTimer;
    zoom: number;
  };
  current_faults: {
    timer: PagesSettingsTimer;
  };
};

type PerformancePageStorage = {
  timer: PagesSettingsTimer;
  zoom: number;
};

type RangeAutomaticTimer = 30 | 60 | 90 | 120;

type PageStorageDefault = {
  timer: PagesSettingsTimer;
  modeView: 'simplified' | 'detailed';
};

type PagesSettingsTimer = {
  automaticMode: boolean;
  timer: RangeAutomaticTimer;
};

type StorageType = 'local' | 'session';
