import { put, takeEvery, call } from "redux-saga/effects";
import { timeReducer } from "../entities/model/Video/slice/timeSlice";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
