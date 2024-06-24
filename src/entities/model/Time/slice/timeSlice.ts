import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITimLaps, TimeSchema } from "../../../../types/TypeVideo";
import { getTime } from "../services/getTime";

const initialState: TimeSchema = {
  isLoading: false,
  time: [],
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTime.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getTime.fulfilled,
      (state, action: PayloadAction<ITimLaps[]>) => {
        state.isLoading = false;
        state.time = action.payload;
      }
    );
    builder.addCase(getTime.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { actions: timeActions, reducer: timeReducer } = timeSlice;
