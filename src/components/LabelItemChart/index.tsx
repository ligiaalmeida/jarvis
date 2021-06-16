import Tooltip from '../Tooltip';

import { theme } from 'styles/theme';

import * as Types from './types';
import * as S from './styles';

const loren =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan ligula libero, ut bibendum ex dapibus et.';

const LabelItemChart = ({ label, colorTag, description = loren }: Types.LabelItemChartProps) => {
  return (
    <S.Label>
      <S.Tag colorTag={colorTag} />
      <span>{label}</span>
      <Tooltip
        xPosition="-24px"
        yPosition="15px"
        bgColorIcon={theme.colors.grey_2}
        description={
          <>
            <span>
              <strong>{label}</strong>
            </span>
            <p>{description}</p>
          </>
        }
      />
    </S.Label>
  );
};

export default LabelItemChart;
