import { useWindowWidth } from 'hooks';
import LargeScreens from './Boards/LargeScreens';
import SmallScreens from './Boards/SmallScreen';
import * as Types from '../types';

const StationList = ({ stationList }: Types.StationListProps) => {
  const width = useWindowWidth();

  return width >= 1281 ? (
    <LargeScreens stationList={stationList} />
  ) : (
    <SmallScreens stationList={stationList} />
  );
};

export default StationList;
