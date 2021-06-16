export type TableListProps = {
  title: string;
  data: MixSuggestionData;
  type: TableType;
  np: NpTable[];
};

export type NpTable = {
  np: number;
};

export type TableType = 'scheduled' | 'suggested';

export type MixSuggestionData = {
  original_time: number;
  predicted_time: number;
  processed_timestamp: number;
  delta_gain: number;
  info_type: string;
  rows: {
    seq: number;
    np: number;
    baumuster: string;
  }[];
};

/*=-=-=-=-=-=-==-=-= STYLES =-=-=-=-=-=-==-=-=*/

export type TableTypeProps = {
  type: TableType;
};
