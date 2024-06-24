import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Chapters from "./Chapters";
import { getTimeState } from "./entities/model/Video/selectors/getTimeState";
import { getTime } from "./entities/model/Video/services/getTime";
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
    // let flag = false
    const test = time.find((item) => {
      if (
        item.timestamp <= e.target?.currentTime &&
        e.target?.currentTime < item.timestamp + item.duration
      ) {
        return item;
      }
    });
    // if(test) {
    //   flag = true
    // } else {
    //   flag = false
    // }
    // if(flag) {
    //   setTimeout(() => {
    //       const deleteBlock = greenBlock.filter((item) => item.id !== idx);
    //       setGreenBlock(deleteBlock);
    //     }, item.duration);
    // }
    console.log(test);
    time.forEach((item, idx) => {
      if (
        item.timestamp <= e.target?.currentTime &&
        e.target?.currentTime < item.timestamp + item.duration
      ) {
        setGreenBlock((prev) => [
          ...prev,
          { ...item.zone, id: idx, duration: item.duration },
        ]);
      }
    });
    // timerRef.current = deleteBlock(idx);
    // new Promise((res, rej) => {
    // setTimeout(() => {
    //   const deleteBlock = greenBlock.filter((item) => item.id !== idx);
    //   setGreenBlock(deleteBlock);
    // }, item.duration);
    // });
    // }
    // setTimeout(() => {
    //   const deleteBlock = greenBlock.filter((item) => item.id !== idx);
    //   setGreenBlock(deleteBlock);
    // }, item.duration);
    // });
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
