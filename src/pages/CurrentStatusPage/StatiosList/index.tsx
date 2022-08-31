import { useState, useEffect, useCallback } from 'react';
import { useWindowWidth } from 'hooks';
import { ColorStatusType, Stations, StationsList } from 'types';
import { theme } from 'styles/theme';
import LargeScreens from './Boards/LargeScreens';
import SmallScreens from './Boards/SmallScreen';
import * as Types from '../types';

const StationList = ({ stationList }: Types.StationListProps) => {
  const width = useWindowWidth();
  console.log('width', width);

  return width >= 1281 ? (
    <LargeScreens stationList={stationList} />
  ) : (
    <SmallScreens stationList={stationList} />
  );
};

export default StationList;
