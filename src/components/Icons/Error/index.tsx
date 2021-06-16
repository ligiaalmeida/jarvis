import { SVGProps } from 'types';

const Error = ({ width = '60px', height = '60px', fill = '#D0021B' }: SVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 60 60"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 60.125C13.4315 60.125 0 46.6935 0 30.125C0 13.5565 13.4315 0.125 30 0.125C46.5685 0.125 60 13.5565 60 30.125C60 46.6935 46.5685 60.125 30 60.125ZM30 58.125C45.464 58.125 58 45.589 58 30.125C58 14.661 45.464 2.125 30 2.125C14.536 2.125 2 14.661 2 30.125C2 45.589 14.536 58.125 30 58.125ZM30.5 39.2404C31.6045 39.2403 32.4999 38.2218 32.5 36.9653V16.9001C32.5 15.6436 31.6046 14.625 30.5 14.625C29.3954 14.625 28.5 15.6436 28.5 16.9001V36.9653C28.5001 38.2218 29.3955 39.2403 30.5 39.2404ZM30.5 41.7019C29.3954 41.7019 28.5 42.5974 28.5 43.7019C28.5 44.8065 29.3954 45.7019 30.5 45.7019C31.6046 45.7019 32.5 44.8065 32.5 43.7019C32.5 43.1715 32.2893 42.6628 31.9142 42.2877C31.5391 41.9126 31.0304 41.7019 30.5 41.7019Z"
        fill={fill}
      />
    </svg>
  );
};

export default Error;
