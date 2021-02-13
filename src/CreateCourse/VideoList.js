import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  List,
  ListItem,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useContext, useEffect, useState } from "react";
import { ADD_SINGLE_VIDEO, SET_VIDEOS } from "../context/action.types";
import { PlaylistContext } from "../context/PlaylistContext";
import { VideoListContext } from "../context/VideoListContext";
import { youtubeRequest, ytVideoRequest } from "../utils/youtubeAPI";
import VideoCard from "./VideoCard";
import { convert_time, getVideoId, secondsToHms } from "../utils/functions";

const useStyles = makeStyles({
  heading: {
    padding: "0.3em",
    margin: "0.3em",
  },
  videoList: {
    maxHeight: "86vh",
    overflow: "auto",
    margin: "0.4em 0",
  },
  progress: {
    display: "block",
    textAlign: "center",
    margin: "25% 50% 0 25%",
  },
  button: {
    margin: "1em",
    float: "right",
    position: "relative",
  },
});

const VideoList = ({ setTotalTime }) => {
  const classes = useStyles();
  const { playlistId } = useContext(PlaylistContext);
  const { state, dispatch } = useContext(VideoListContext);

  const [videos, setVideos] = useState();
  const [loadingPlaylistItems, setLoadingPlaylistItems] = useState(true);
  const [loadingPlaylistVideo, setLoadingPlaylistVideo] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [durations, setDurations] = useState([]);
  const [openAddVideoDialog, setOpenAddVideoDialog] = useState(false);
  const [singleVideoLink, setSingleVideoLink] = useState("");

  const fetchPlaylist = async () => {
    setLoadingPlaylistItems(true);
    const { status, data } = await youtubeRequest.get("/playlistItems", {
      params: {
        playlistId,
      },
    });

    if (status === 200) {
      let videosArray = [];
      data.items.forEach((videoObject) => {
        let video = {
          videoId: videoObject.snippet?.resourceId.videoId,
          thumb: videoObject.snippet?.thumbnails.medium.url,
          videoTitle: videoObject.snippet?.title,
          channelTitle: videoObject.snippet?.channelTitle,
        };
        videosArray.push(video);
      });

      // TODO: uncomment this for fetching whole playlist (while deploying)
      /* while (data.nextPageToken) {
          console.log("i want another request");
          const response = await youtubeRequest.get("/playlistItems", {
            params: {
              playlistId,
              pageToken: data.nextPageToken,
            },
          });
          if (response.status === 200) {
            response.data.items.forEach((videoObject) => {
              let video = {
                videoId: videoObject.snippet?.resourceId.videoId,
                thumb: videoObject.snippet?.thumbnails.medium.url,
                videoTitle: videoObject.snippet?.title,
                channelTitle: videoObject.snippet?.channelTitle,
              };
              videosArray.push(video);
            });
          }
        } */

      // save data to context
      dispatch({
        type: SET_VIDEOS,
        payload: videosArray,
      });
      // setVideos(videosArray);
      setLoadingPlaylistItems(false);
      setTotalResults(data.pageInfo?.totalResults);
    }
  };

  const fetchVideoDurations = async () => {
    setLoadingPlaylistVideo(true);
    // console.log(videosArray);
    let newVideosArray = [];
    let tempDurations = [];
    for (const videoObject of videos) {
      const { status, data } = await ytVideoRequest.get("/videos", {
        params: {
          id: videoObject.videoId,
        },
      });
      // console.log(status);
      if (status === 200) {
        let duration = data.items[0].contentDetails.duration;
        tempDurations.push(convert_time(duration));
        // console.log(duration);
        // save this duration in videoObject
        newVideosArray.push({ ...videoObject, duration });
      }
    }
    console.log(newVideosArray);
    setDurations(tempDurations);
    // if context was updated here, then it will go in loop
    // coz of the 4th useEffet hook defined below
    // dispatch({
    //   type: SET_VIDEOS,
    //   payload: newVideosArray,
    // });
  };

  const calculateTotalDuration = () => {
    let totalDuration = 0;
    durations.forEach((dur) => {
      totalDuration += dur;
    });

    setTotalTime(secondsToHms(totalDuration));
  };

  const toggleAddVideoDialog = () => {
    setOpenAddVideoDialog(!openAddVideoDialog);
  };
  const addSingleVideo = async () => {
    console.log(singleVideoLink);
    let videoId = getVideoId(singleVideoLink);

    const { status, data } = await ytVideoRequest.get("/videos", {
      params: {
        id: videoId,
        part: "contentDetails, snippet",
      },
    });
    if (status === 200) {
      let videoObject = data.items[0];
      let video = {
        videoId,
        thumb: videoObject.snippet?.thumbnails.medium.url,
        videoTitle: videoObject.snippet?.title,
        channelTitle: videoObject.snippet?.channelTitle,
      };
      dispatch({
        type: ADD_SINGLE_VIDEO,
        payload: video,
      });
      setTotalResults(totalResults + 1);
    }
    toggleAddVideoDialog();
  };

  // first this will run
  useEffect(() => {
    if (playlistId) {
      fetchPlaylist();
    } else {
      setLoadingPlaylistItems(false);
      setLoadingPlaylistVideo(false);
    }
  }, [playlistId]);

  // second this will run
  useEffect(() => {
    if (videos) {
      // console.log("video ids: ", videos.videoId);
      console.log("i was changed due to context");
      fetchVideoDurations();
    } else {
      console.log("wrong call");
    }
  }, [videos]);

  // third this will run
  useEffect(() => {
    if (durations) {
      calculateTotalDuration();
    }
  }, [durations]);

  // forth: on every global state change, this will change local state i.e. videos
  useEffect(() => {
    if (state.length !== 0) {
      setVideos(state);
    } else {
      console.log("empty state changed");
    }
  }, [state]);

  return (
    <>
      <Grid container>
        <Typography component="h5" variant="h5" className={classes.heading}>
          List of Videos for course
        </Typography>

        <div className={classes.button}>
          <Typography component="p" variant="hp">
            Total Videos: {totalResults}
          </Typography>
          <span onClick={toggleAddVideoDialog}>
            <Fab color="primary" variant="extended">
              <AddIcon />
              Add Single Video
            </Fab>
          </span>
        </div>

        {loadingPlaylistItems ? (
          <div className={classes.progress}>
            <CircularProgress size={60} classes={classes.progress} />
          </div>
        ) : (
          <List className={classes.videoList}>
            {state.map((mVideo, index) => (
              <ListItem key={mVideo.videoId} maxWidth="100%">
                <VideoCard mVideo={mVideo} duration={durations[index]} />
              </ListItem>
            ))}
          </List>
        )}
      </Grid>

      <div className="addVideoDialog">
        <Dialog
          open={openAddVideoDialog}
          onClose={toggleAddVideoDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Paste the link of the video which you want to add to this course!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Youtube Video Link"
              type="email"
              fullWidth
              onChange={(e) => {
                setSingleVideoLink(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleAddVideoDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={addSingleVideo}
              color="primary"
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default VideoList;
