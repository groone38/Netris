import React, { memo } from "react";
import { useAppSelector } from "./store/store";
import { getTimeState } from "./entities/model/Video/selectors/getTimeState";

interface ITimLapsPorps {
  jumpChapters: (time: number) => void;
}

const Chapters = memo(({ jumpChapters }: ITimLapsPorps) => {
  const { time, isLoading } = useAppSelector(getTimeState);
  return (
    <div className="timeLaps">
      {isLoading && <h1>Loadins...</h1>}
      {time.map((item) => (
        <p
          className="time"
          key={item.timestamp}
          onClick={() => jumpChapters(item.timestamp)}
        >
          {item.timestampVue}
        </p>
      ))}
    </div>
  );
});

export default Chapters;
