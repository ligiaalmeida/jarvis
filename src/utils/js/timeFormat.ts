const Types = {
  DD_HH_MM_SS: 'DD:HH:MM:SS',
  DD_HH_MM: 'DD:HH:MM',
  DD_MM_SS: 'DD:MM:SS',
  HH_MM_SS: 'HH:MM:SS',
  HH_MM: 'HH:MM',
  MM_SS: 'MM:SS',
};

export const timeFormat = ({
  time,
  displayFormat,
  separatorHour,
  separatorMinute,
  separatorSeconds,
}: TimeFormatArgs) => {
  const hrs = Math.floor(time / 3600.0);
  const min = Math.floor(time / 60.0 - hrs * 60);
  const secs = Math.floor(time - hrs * 3600 - min * 60);

  const fHour = `${hrs < 10 ? '0' : ''}${hrs}`;
  const fMin = `${min < 10 ? '0' : ''}${min}`;
  const fSec = `${secs < 10 ? '0' : ''}${secs}`;
  const fDay = `${hrs >= 24 ? Math.floor(hrs / 24) : ''}`;

  const fSeparatorHour = separatorHour || ':';
  const fSeparatorMin = separatorMinute || ':';
  const fSeparatorSec = separatorSeconds || '';

  switch (displayFormat) {
    case Types.HH_MM_SS:
      // return `${fHour}${fSeparatorHour}${fMin}${fSeparatorMin}${fSec}${fSeparatorSec}`;
      return `${
        Number(fHour) === 0
          ? `${fMin}${fSeparatorMin}${fSec}${fSeparatorSec}`
          : `${fHour}${fSeparatorHour}${fMin}${fSeparatorMin}${fSec}${fSeparatorSec}`
      }`;
    case Types.DD_HH_MM_SS:
      return `${Number(fDay) > 0 ? `${fDay}D` : '0D'} ${
        Number(fHour) <= 23 ? fHour : +fHour - 24 * Number(fDay)
      }${fSeparatorHour}${fMin}${fSeparatorMin}${fSec}${fSeparatorSec}`;
    case Types.HH_MM:
      return `${fHour}${fSeparatorHour}${fMin}${fSeparatorMin}`;
    case Types.MM_SS:
      return `${fMin}${fSeparatorMin}${fSec}${fSeparatorSec}`;
    default:
      return `Error: Enter a valid type: 'HH:MM:SS' | 'HH:MM' | 'MM:SS'`;
  }
};

export const timeConverter = (UNIX_timestamp: number) => {
  const a = new Date(UNIX_timestamp * 1000);
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const day = date < 10 ? `0${date}` : date;
  const time = day + '/' + month + '/' + year;
  return time;
};
