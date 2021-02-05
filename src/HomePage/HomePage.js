import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { PlaylistContext } from "../context/PlaylistContext";

const HomePage = ()=> {

    // context values provided from context.provider
    const {setPlaylistId} = useContext(PlaylistContext)

    // states
    const [url , setUrl] = useState("")
    const [redirect, setRedirect] = useState(false)
    

    // functions
    const getIdFromUrl = playlistURL => {
        let startIndex = playlistURL.search("list=");
        startIndex+=5;
        playlistURL = playlistURL.substring(startIndex, playlistURL.length);

        let endIndex = playlistURL.search("&");
        endIndex = (endIndex === -1) ? (playlistURL.length) : (endIndex);

        let id = playlistURL.substring(0,endIndex);

        return id;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        setPlaylistId(getIdFromUrl(url))
        setRedirect(true)
    }
    return (
        <div>
            {/* if playlist id is fetched successfully, redirect to create course */}
            {redirect ? <Redirect to="/createCourse" /> : null}
            <h1>Home</h1>
            <input type ="text" placeholder="paste the playlist URL here..." value={url} onChange={e=>setUrl(e.target.value)}/>
            <button onClick={handleSubmit}>Fetch Playlist</button>
        </div>
    )
}

export default HomePage;