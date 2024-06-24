import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Chapters from "./widgets/Chapters/Chapters";
import { getTimeState } from "./entities/model/Time/selectors/getTimeState";
import { getTime } from "./entities/model/Time/services/getTime";
import { useAppDispatch, useAppSelector } from "./store/store";
import { ZoneBlock } from "./types/TypeVideo";

function App() {
  const [greenBlock, setGreenBlock] = useState<ZoneBlock[]>([]);
  const ref = useRef<HTMLVideoElement>(null);
  const { time } = useAppSelector(getTimeState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTime());
  }, []);

  const progressTime = (e: React.ChangeEvent<HTMLVideoElement>) => {
    const currentProgress = time.filter((item) => {
      if (
        item.timestamp <= e.target?.currentTime &&
        e.target?.currentTime < item.timestamp + item.duration
      ) {
        return item;
      }
    });

    time.forEach((item, idx) => {
      if (
        item.timestamp <= e.target?.currentTime &&
        e.target?.currentTime < item.timestamp + item.duration
      ) {
        setGreenBlock(
          currentProgress.map((item) => ({
            ...item.zone,
            id: idx,
            duration: item.duration,
          }))
        );
      }
    });
  };

  const jumpChapters = (time: number) => {
    if (ref.current?.currentTime !== undefined) {
      ref.current.currentTime = time;
    }
  };

  return (
    <div className="App">
      <div className="video">
        {greenBlock.map((item, idx) => (
          <div
            key={idx}
            className="block"
            style={{
              width: item.width,
              height: item.height,
              left: item.left,
              top: item.top,
            }}
          ></div>
        ))}
        <video
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          ref={ref}
          onTimeUpdate={(e: React.ChangeEvent<HTMLVideoElement>) =>
            progressTime(e)
          }
          height={700}
        ></video>
      </div>
      <Chapters jumpChapters={jumpChapters} />
    </div>
  );
}

export default App;
