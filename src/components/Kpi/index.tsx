import ContentLoader from 'react-content-loader';

import { Container } from 'components/Layout';

import * as Types from './types';
import * as S from './styles';
import { theme } from '../../styles/theme';
import { Tooltip, Typography } from '@material-ui/core';
import React from 'react';

const Kpi = ({ data }: Types.KpiProps) => {
  const kpiData =
    data &&
    data.map((kpi, idx) => {
      return {
        id: idx,
        ...kpi,
      };
    });

  return (
    <S.Wrapper>
      <Container xs={16} padding={{ xs: [0, 0, theme.distance.stout, 'rem'] }}>
        {!data && (
          <ContentLoader
            viewBox="0 0 1855 136"
            animate
            backgroundColor="#EFF3F8"
            foregroundColor="#D8DDE6"
          >
            <rect width="1855" height="136" rx="8" fill="#C4C4C4" />
          </ContentLoader>
        )}
        {data && (
          <S.Container>
            {kpiData &&
              kpiData.map((kpi) => {
                return (
                  <>
                    {kpiData[kpiData.length - 1] === kpi ? (
                      <S.HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit" variant="h5">
                              Diferença entre o Tempo Acumulado de Linha{' '}
                              <strong>Parada</strong> subtraído o Tempo de Linha{' '}
                              <strong>Inoperante</strong>.
                            </Typography>
                          </React.Fragment>
                        }
                        placement="top"
                      >
                        <S.KpiItem
                          key={kpi.id}
                          countItems={kpiData.length}
                          countCharacters={kpi.title.length}
                        >
                          <span>{kpi.title}</span>
                          <span>{kpi.value}</span>
                        </S.KpiItem>
                      </S.HtmlTooltip>
                    ) : (
                      <S.KpiItem
                        key={kpi.id}
                        countItems={kpiData.length}
                        countCharacters={kpi.title.length}
                      >
                        <span>{kpi.title}</span>
                        <span>{kpi.value}</span>
                      </S.KpiItem>
                    )}
                  </>
                );
              })}
          </S.Container>
        )}
      </Container>
    </S.Wrapper>
  );
};

export default Kpi;
