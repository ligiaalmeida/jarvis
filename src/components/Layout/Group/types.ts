/*= -=-=-=-=-= COMPONENT =-=-=-=-=-= */
export type GroupProps<T> = {
  flexDirection?: T;
  unitOfMeasurement?: string;
  margin?: [number, number, number, number] | [number, number];
  children?: React.ReactNode;
};

/*= -=-=-=-=-= STYLES =-=-=-=-=-= */

export type GroupContainerProps = {
  itemsDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  unitOfMeasurement: string;
  margin: [number, number, number, number] | [number, number];
};
