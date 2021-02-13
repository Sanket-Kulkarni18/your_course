import axios from "axios";

const API_KEY = "AIzaSyBKx9SFGUzz1uUtGkDyjFiL3zF0skagBIQ";

// playlist request
// https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&key=AIzaSyBKx9SFGUzz1uUtGkDyjFiL3zF0skagBIQ

export const youtubeRequest = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    // TODO: uncomment this when deplying
    // maxResults: 50,
    maxResults: 5,
    key: API_KEY,
  },
  headers: {},
});

export const ytVideoRequest = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "contentDetails",
    key: API_KEY,
  },
  headers: {},
});

 export const firebaseConfig = {
 apiKey: "AIzaSyBKx9SFGUzz1uUtGkDyjFiL3zF0skagBIQ",
    authDomain: "your-course-a96e0.firebaseapp.com",
    projectId: "your-course-a96e0",
    storageBucket: "your-course-a96e0.appspot.com",
    messagingSenderId: "443915282374",
    appId: "1:443915282374:web:d4e506128295bab56234c7"
  };
