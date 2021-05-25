import { Buildings } from 'types';

export const getDisplayBuilding = (building: Buildings) => {
  switch (building) {
    case 'line_mci':
      return '58';
    case 'line_trim':
      return '41';
    default:
      return '40';
  }
};
