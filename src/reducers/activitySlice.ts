import { createSlice } from "@reduxjs/toolkit";

function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const activitySlice = createSlice({
  name: "nav",
  initialState: { activities: [] },
  reducers: {
    addActivity(state: any, action: any) {
      let data = {
        ...action.payload,
        id: uuidv4(),
        items: [],
      };
      state.activities.push(data);
    },
    editActivity(state: any, action: any) {
      let activityExist = state.activities.findIndex(
        (a: any) => a.id === action.payload.id
      );
      if (activityExist !== -1) {
        state.activities[activityExist].items = [
          ...state.activities[activityExist].items,
          { ...action.payload.values, updatedAt: new Date().toLocaleString() },
        ];
      }
    },
    deleteActivity(state: any, action: any) {
      state.activities = state.activities.filter(
        (i: any) => i.id !== action.payload
      );
    },
  },
});

export const { addActivity, editActivity, deleteActivity } =
  activitySlice.actions;
export default activitySlice.reducer;
