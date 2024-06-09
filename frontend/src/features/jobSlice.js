import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobsList: [],
  },
  reducers: {
    post,
  },
});
