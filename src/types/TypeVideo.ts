export interface TimeSchema {
  isLoading: boolean;
  time: ITimLaps[];
}

export interface Zone {
  height: number;
  left: number;
  top: number;
  width: number;
}

export interface ZoneBlock extends Zone {
  id: number;
  duration: number;
}
export interface ITimLapsResponce {
  duration: number;
  timestamp: number;
  zone: Zone;
}

export interface ITimLaps extends ITimLapsResponce {
  timestampVue: string;
}

export type TimeMaps = {
  [key: number]: {
    duration: number;
    timestamp: number;
    zone: Zone;
  };
};
