import ContentLoader from 'react-content-loader';

import { range } from 'utils/js';

import * as S from './styles';

const Loading = () => {
  return (
    <S.Container>
      {range(0, 1).map((_, idxRow) => (
        <div key={idxRow}>
          <div className="loading__title">
            <ContentLoader viewBox="0 0 200 30" animate backgroundColor="#EFF3F8" foregroundColor="#D8DDE6">
              <rect width="200" height="30" fill="#C4C4C4" />
            </ContentLoader>
          </div>
          <div className="loading__wrapper">
            {range(0, 2).map((_, idxItem) => (
              <div key={idxItem} className="loading__content">
                <ContentLoader viewBox="0 0 240 250" animate backgroundColor="#EFF3F8" foregroundColor="#D8DDE6">
                  <rect width="240" height="250" fill="#C4C4C4" />
                </ContentLoader>
              </div>
            ))}
          </div>
        </div>
      ))}
    </S.Container>
  );
};

export default Loading;
