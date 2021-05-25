/*= -=-=-=-=-= COMPONENT =-=-=-=-=-= */
export type KPIDatasets = {
  title: string;
  value: string | number;
};

export type KpiProps = {
  isLoading?: boolean;
  data: KPIDatasets[];
};

/*= -=-=-=-=-= STYLES =-=-=-=-=-= */
export type ContentItemProps = {
  countItems?: number;
  countCharacters: number;
};
