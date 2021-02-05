import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { plReqApi } from "../utils/youtubeAPI";

const CreateCourse = ()=> {

    const {playlistId} = useContext(PlaylistContext)

    const [videos, setVideos] = useState()

// https://youtube.googleapis.com/youtube/v3/
// playlistItems?part=snippet&playlistId=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&key=[YOUR_API_KEY]

    const fetchPlaylist = async()=> {
        const {status, data} = await plReqApi.get('/playlistItems', {
            params: {
                playlistId
            }
        })

        if(status === 200){
            let videosArray = []
            data.items.forEach(videoObject=> {
                let video = {
                    videoId: videoObject.snippet?.resourceId.videoId,
                    thumb: videoObject.snippet?.thumbnails.medium.url,
                    videoTitle: videoObject.snippet?.title,
                    channelTitle: videoObject.snippet?.channelTitle,
                }
                videosArray.push(video)
            })
            setVideos(videosArray)

            console.log(videos)
        }

    }

    useEffect(() => {
        if(playlistId){
            fetchPlaylist()
        }
    }, [playlistId]);

    return (
        <div>
            <h1>Create Course</h1>
            <p>Playlist ID: {playlistId}</p>
        </div>
    )
}

export default CreateCourse;