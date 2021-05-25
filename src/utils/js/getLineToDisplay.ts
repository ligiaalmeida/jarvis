import { Buildings } from 'types';

export const getLineToDisplay = (line: Buildings) => {
  switch (line) {
    case 'line_trim':
      return 'TRIM - 41';
    case 'line_mci':
      return 'MCI - 58';
    default:
      return 'H - 40';
  }
};
