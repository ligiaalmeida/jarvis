import React, { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { KeysOfPagesContainingTimer, RangeAutomaticTimer } from 'types';

export type Environment = 'development' | 'production';

export type SettingsSwitchTabsProps = {
  setState: Dispatch<SetStateAction<number>>;
  countOfTabs: number;
  actionTimer?: (seconds: RangeAutomaticTimer) => void;
  actionAutomaticMode?: (type: boolean) => void;
  namespace?: KeysOfPagesContainingTimer;
  configSlider?: {
    step: number;
    min: number;
    max: number;
  };
};

export type RefElement = {
  ref: MutableRefObject<HTMLDivElement>;
};

export type Locale = 'pt-BR' | 'en-US' | 'de';
export type NumberFormatType = 'decimal' | 'currency' | 'percent';

export type Pathname =
  | '/'
  | '/performance'
  | '/fault_prediction'
  | '/current_faults'
  | '/current_status'
  | '/mix_suggestion'
  | '/performance_history'
  | '/monthly_report';

export type Pages =
  | 'performance'
  | 'monthlyReport'
  | 'currentFaults'
  | 'faultPrediction'
  | 'currentStatus'
  | 'mixSuggestion'
  | 'performanceHistory';

export type PageProps = {
  inputs?: React.ReactNode;
};

export type ModeView = 'simplified' | 'detailed';
