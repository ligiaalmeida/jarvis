type TableListProps = {
  title: string;
  data: MixSuggestionData;
  type: TableType;
  np: NpTable[];
};

type NpTable = {
  np: number;
};

type TableType = 'scheduled' | 'suggested';

type MixSuggestionData = {
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

type TableTypeProps = {
  type: TableType;
};
