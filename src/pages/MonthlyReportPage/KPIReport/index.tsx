import React from 'react';

import * as Types from '../types';

import * as S from './styles';
import KPIReportItem from './KPIReportItem';

const KPIReport: React.FC<Types.KPIReportProps> = ({
  labels,
  values,
  prefix,
  marginBottom,
}) => {
  return (
    <S.Container marginBottom={marginBottom}>
      {labels && values && (
        <div>
          <h3>{labels.title || labels.chart_title}</h3>
          <div>
            <KPIReportItem
              id="kpi-item-min"
              taktType="min"
              title={labels?.minimum}
              value={values?.minimum}
              prefix={prefix}
              labels={labels}
            />

            <KPIReportItem
              id="kpi-item-med"
              taktType="med"
              title={labels?.medium}
              value={values?.medium}
              prefix={prefix}
              labels={labels}
            />

            <KPIReportItem
              id="kpi-item-max"
              taktType="max"
              title={labels?.maximum}
              value={values?.maximum}
              prefix={prefix}
              labels={labels}
            />
          </div>
        </div>
      )}
    </S.Container>
  );
};

export default KPIReport;
