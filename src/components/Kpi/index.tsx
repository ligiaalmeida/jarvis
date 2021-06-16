import ContentLoader from 'react-content-loader';

import { Container } from 'components/Layout';

import * as Types from './types';
import * as S from './styles';
import { theme } from '../../styles/theme';

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
          <ContentLoader viewBox="0 0 1855 136" animate backgroundColor="#EFF3F8" foregroundColor="#D8DDE6">
            <rect width="1855" height="136" rx="8" fill="#C4C4C4" />
          </ContentLoader>
        )}
        {data && (
          <S.Container>
            {kpiData &&
              kpiData.map((kpi) => (
                <S.KpiItem key={kpi.id} countItems={kpiData.length} countCharacters={kpi.title.length}>
                  <span>{kpi.title}</span>
                  <span>{kpi.value}</span>
                </S.KpiItem>
              ))}
          </S.Container>
        )}
      </Container>
    </S.Wrapper>
  );
};

export default Kpi;
