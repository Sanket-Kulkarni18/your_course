import { DELETE_VIDEO, EDIT_VIDEO_TITLE, SET_VIDEOS } from "./action.types";

export const reducer = (state, action) => {
  let newState = [...state];
  let videoIndex = newState.findIndex((vid) => vid.id === action.id);
  switch (action.type) {
    case SET_VIDEOS:
      newState = action.payload;
      return newState;
    case EDIT_VIDEO_TITLE:
      newState[videoIndex] = {
        ...newState[videoIndex],
        videoTitle: action.payload,
      };
      return newState;
    case DELETE_VIDEO:
      return newState.filter((vid) => vid.videoId !== action.id);
    default:
      return newState;
  }
};
