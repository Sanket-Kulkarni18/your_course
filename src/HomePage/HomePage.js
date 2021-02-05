import React, { useState } from "react";

const HomePage = ()=> {
    const [playlistStr , setPlaylistStr] = useState("");
    const [url , setUrl] = useState("");
    const handlesubmit=(e)=>{
        e.preventDefault();
        var urlString = url;
        let startIndex = urlString.search("list=");
        startIndex+=5;
        urlString = urlString.substring(startIndex, url.length);

        let endIndex = urlString.search("&");
        endIndex = (endIndex === -1) ? (url.length) : (endIndex);

        let playlistId = urlString.substring(0,endIndex);
        console.log(playlistId);
        const playlistStr=playlistId;
        // setPlaylistStr("");
    }
    return (
        <div>Home Page 
            <input type ="text" value={url} onChange={e=>setUrl(e.target.value)}/>
            <button onClick={handlesubmit}>click</button>
        </div>
    )
}

export default HomePage;