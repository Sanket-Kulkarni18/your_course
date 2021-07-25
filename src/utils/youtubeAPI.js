import axios from "axios";

const API_KEY = "AIzaSyBKx9SFGUzz1uUtGkDyjFiL3zF0skagBIQ";
const BASE_URL = "https://www.googleapis.com/youtube/v3/";

// playlist request
// https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&key=AIzaSyBKx9SFGUzz1uUtGkDyjFiL3zF0skagBIQ

export const playlistItemsRequest = axios.create({
  baseURL: BASE_URL,
  params: {
    part: "contentDetails",
    // TODO: uncomment this when deplying
    // maxResults: 50,
    maxResults: 5,
    key: API_KEY,
  },
  headers: {},
});

export const videoRequest = axios.create({
  baseURL: BASE_URL,
  params: {
    part: "snippet, contentDetails",
    key: API_KEY,
  },
  headers: {},
});

export const playlistRequest = axios.create({
  baseURL: BASE_URL,
  params: {
    part: "snippet",
    key: API_KEY,
    maxResults: 1,
  },
  headers: {},
});

export const firebaseConfig = {
  apiKey: "AIzaSyBKx9SFGUzz1uUtGkDyjFiL3zF0skagBIQ",
  authDomain: "your-course-a96e0.firebaseapp.com",
  projectId: "your-course-a96e0",
  storageBucket: "your-course-a96e0.appspot.com",
  messagingSenderId: "443915282374",
  appId: "1:443915282374:web:d4e506128295bab56234c7",
};
