export interface IRecallData {
  date: string[];
  recall: string[];
}

export interface IRecallChartData {
  data?: {
    date: string;
    recall: number;
  }[];
}

export interface IFilterData {
  fromValue: string;
  toValue: string;
  onChange: (type: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}
