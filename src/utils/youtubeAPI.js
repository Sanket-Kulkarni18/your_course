import axios from 'axios';

const API_KEY = "AIzaSyBKx9SFGUzz1uUtGkDyjFiL3zF0skagBIQ";

// https://youtube.googleapis.com/youtube/v3/
// playlistItems?part=snippet&playlistId=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&key=[YOUR_API_KEY]

export const plReqApi = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
        part: 'snippet',
        maxResults: 50,
        key: API_KEY
    },
    headers: {}
})