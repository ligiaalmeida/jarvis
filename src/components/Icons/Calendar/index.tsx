import { SVGProps } from 'types';

const Calendar = ({
  width = '24px',
  height = '24px',
  fill = 'red',
}: SVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
    >
      <path
        d="M15.668 1.917H8.335a.917.917 0 00-1.835 0H3.75A2.75 2.75 0 001 4.667V20.25A2.752 2.752 0 003.75 23h16.5A2.75 2.75 0 0023 20.25V4.666a2.75 2.75 0 00-2.75-2.75h-2.749a.917.917 0 00-1.833 0zM3 4.908C3 4.406 3.404 4 3.9 4h16.2c.497 0 .9.406.9.908V9H3V4.908zM3 20.13V11h18v9.13c0 .48-.403.87-.9.87H3.9c-.496 0-.9-.39-.9-.87z"
        fill={fill}
      />
    </svg>
  );
};

export default Calendar;
