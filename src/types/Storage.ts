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

type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T
  ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
    ? X
    : never
  : never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = {
  0: A;
  1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A['length'] ? 0 : 1];

export type Enumerate<N extends number> = EnumerateInternal<
  [],
  N
> extends (infer E)[]
  ? E
  : never;
export type Range<FROM extends number, TO extends number> = Exclude<
  Enumerate<TO>,
  Enumerate<FROM>
>;

export type RangeHours = Range<0, 24>;

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
