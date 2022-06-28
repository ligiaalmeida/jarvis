import React from 'react';

/*= -=-=-=-=-= COMPONENT =-=-=-=-=-= */
export type NavTabsChartProps<T> = {
  data: {
    componentChildren: T[];
    label: {
      id: number;
      title: string;
    };
  }[];
  loader?: true;
  isSettings: boolean;
  padding?: string;
  minHeight?: number;
  children?: React.ReactNode;
};

/*= -=-=-=-=-= STYLES =-=-=-=-=-= */
export type TabsProps = {
  minHeight: number;
};

export interface TabItemProps extends React.FC {
  isActive: boolean;
  childrenCount: number;
}

export type MainProps = {
  isHeightFull?: boolean;
  padding?: string;
  heightScreen?: number;
};
