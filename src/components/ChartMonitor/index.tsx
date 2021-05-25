import React, { useEffect, useRef, useState } from 'react';

import { Pages } from 'types';

import * as S from './styles';

type ChartContentProps = {
  className?: string;
  page?: Pages;
  labels: {
    yAxis: string;
    xAxis: string;
  };
};

const ChartMonitor: React.FC<ChartContentProps> = ({ className, page, labels, children }) => {
  const [height, setHeight] = useState<number>(null!);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref) {
      setHeight(ref.current?.clientHeight as number);
    }
  });

  return (
    <S.ChartContainer className={className ? `chart ${className}` : 'chart'} page={page} chartHeight={height}>
      <div className="chart__content">
        <div className="chart__label-y-axis">
          <h4>{labels.yAxis}</h4>
        </div>
        <div className="chart__wrapper">
          <div ref={ref} className="chart__monitor">
            {children}
          </div>
          <div className="chart__label-x-axis">
            <h4>{labels.xAxis}</h4>
          </div>
        </div>
      </div>
    </S.ChartContainer>
  );
};

export default ChartMonitor;
