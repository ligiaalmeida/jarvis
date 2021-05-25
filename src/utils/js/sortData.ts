import { MonthlyReportChartDatasets, LineChartsProps, GeneralChartProps } from 'pages/MonthlyReportPage/types';

export const sortData = ({ data }: Pick<LineChartsProps, 'data'> | Pick<GeneralChartProps, 'data'>) => {
  const datasetsSort: MonthlyReportChartDatasets[] = [];

  const keys = (data.datasets as unknown[])
    .map((data: MonthlyReportChartDatasets) => data.key)
    .sort((keyA, keyB) => {
      if (keyA > keyB) return 1;
      if (keyA < keyB) return -1;

      return 0;
    });

  keys.forEach((key) => {
    datasetsSort.push((data.datasets as MonthlyReportChartDatasets[]).filter((item) => item.key === key)[0]);
  });

  return datasetsSort;
};
