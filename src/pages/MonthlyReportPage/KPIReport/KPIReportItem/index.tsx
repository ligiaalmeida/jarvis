import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';

import { StateMapToPropsGlobal } from 'types';

import * as S from './styles';
import * as Types from '../../types';
import texts from '../../texts';

import { numberFormat } from 'utils/js';

const KPIReportItem = ({ title, value, prefix, labels, id, taktType }: Types.KPIReportItemProps) => {
  const [loading, setLoading] = useState(false);

  const settings = useSelector((state: Pick<StateMapToPropsGlobal, 'global'>) => state.global);
  const monthlyReportPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'monthlyReportPage'>) => state.monthlyReportPage
  );

  useEffect(() => {
    setLoading(true);

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [monthlyReportPage.station_selected, monthlyReportPage.params.date, settings.building]);

  if (value === 39) console.log('labels ->', labels);

  return (
    <S.KPIItem id={id} taktType={taktType} isBorder={!monthlyReportPage.loading && !loading}>
      {(monthlyReportPage.loading || loading) && (
        <ContentLoader viewBox="0 0 240 234" animate backgroundColor="#EFF3F8" foregroundColor="#D8DDE6">
          <rect width="240" height="234" fill="#C4C4C4" />
        </ContentLoader>
      )}

      {(!monthlyReportPage.loading || !loading) && (labels || value) && (
        <>
          <p>{title}</p>
          <span>
            {Object.values(texts.charts.not_time)
              .map((item) => item.pt_br)
              .includes((labels.title as string) || (labels.chart_title as string))
              ? numberFormat({
                  value: Number(value),
                  locale: 'pt-BR',
                  options: {
                    style: 'decimal',
                    maximumFractionDigits: 1,
                  },
                })
              : value}
          </span>
          <span>{prefix}</span>
        </>
      )}
    </S.KPIItem>
  );
};

export default KPIReportItem;
