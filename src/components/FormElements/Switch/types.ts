export type SwitchProps = {
  enabled?: boolean;
  className?: string;
  label?: string;
  labelDirection?: 'left' | 'right';
  fontSize?: string;
  padding?: string;
  scaleSwitch?: number;
  onChange: (toggle: boolean) => void;
};
