import { createSlice } from "@reduxjs/toolkit";
import { uuidv4 } from "../helpers/uuid4";

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activities: [
      {
        id: "1",
        name: "Blog",
        updatedAt: new Date().toLocaleString(),
        type: "Notes",
        items: [],
      },
    ],
  },
  reducers: {
    addActivity(state: any, action: any) {
      let data = {
        ...action.payload,
        id: uuidv4().toString(),
        items: [],
        updatedAt: new Date().toLocaleString(),
      };

      state.activities.unshift(data);
    },
    editActivity(state: any, action: any) {
      let activityExist = state.activities.findIndex(
        (a: any) => a.id === action.payload.activity.id
      );
      console.log(activityExist, action.payload.activity);
      if (activityExist !== -1)
        state.activities[activityExist] = action.payload.activity;
    },
    deleteItem(state: any, action: any) {
      let activity = state.activities.findIndex(
        (i: any) => i.id === action.payload.actId
      );
      if (activity !== -1) {
        let newState = state.activities[activity].items.filter(
          (i: any) => i.id !== action.payload.taskId
        );
        state.activities[activity].items = newState;
      }
    },
  },
});

export const { addActivity, editActivity, deleteItem } = activitySlice.actions;
export default activitySlice.reducer;
