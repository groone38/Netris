import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITimLapsResponce } from "../../../../types/TypeVideo";
import { createTime } from "../../../../shared/lib/utils";

export const getTime = createAsyncThunk(
  "time/fetchTime",
  async (_, thunkAPI) => {
    try {
      const responce: ITimLapsResponce[] = await fetch(
        "https://run.mocky.io/v3/d5dea963-2802-4856-9cab-378fdba1283d"
      ).then((res) => res.json());

      const res = responce.map((item) => {
        let s = Math.trunc(item.timestamp);
        let minutes: number | string = Math.floor(s / 60);
        let seconds: number | string = s % 60;

        minutes = createTime(minutes);
        seconds = createTime(seconds);
        let ms = ("" + item.timestamp.toFixed(3)).split(".")[1];

        return { ...item, timestampVue: minutes + ":" + seconds + ":" + ms };
      });

      if (!responce) {
        throw new Error();
      }

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
