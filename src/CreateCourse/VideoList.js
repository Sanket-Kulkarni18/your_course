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
import { playlistItemsRequest, videoRequest } from "../utils/youtubeAPI";
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

  const [videoIDs, setVideoIDs] = useState([]);
  const [loadingPlaylistVideo, setLoadingPlaylistVideo] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [openAddVideoDialog, setOpenAddVideoDialog] = useState(false);
  const [singleVideoLink, setSingleVideoLink] = useState("");

  const fetchPlaylist = async () => {
    let videoIDsArray = [];
    const { status, data } = await playlistItemsRequest.get("/playlistItems", {
      params: {
        maxResults: 50,
        playlistId,
      },
    });

    if (status === 200) {
      data.items.forEach((videoObject) => {
        let videoId = videoObject.contentDetails?.videoId;
        videoIDsArray.push(videoId);
      });
    }

    let hasNextPage = false;
    let token = "";

    if (data.nextPageToken) {
      hasNextPage = true;
      token = data.nextPageToken;
    }

    // TODO: uncomment this for fetching whole playlist (while deploying)
    while (hasNextPage) {
      console.log("i want another request");
      const response = await playlistItemsRequest.get("/playlistItems", {
        params: {
          maxResults: 50,
          playlistId,
          pageToken: token,
        },
      });
      if (response.status === 200) {
        response.data.items.forEach((videoObject) => {
          let videoId = videoObject.contentDetails?.videoId;
          videoIDsArray.push(videoId);
        });
        if (response.data.nextPageToken) {
          token = response.data.nextPageToken;
        } else {
          token = "";
          hasNextPage = false;
        }
      }
    }

    setVideoIDs(videoIDsArray);
  };

  const fetchVideoDetails = async () => {
    setLoadingPlaylistVideo(true);
    // console.log(videosArray);
    let videosArray = [];
    // let tempDurations = [];
    for (const videoId of videoIDs) {
      const { status, data } = await videoRequest.get("/videos", {
        params: {
          id: videoId,
        },
      });
      // console.log(status);
      if (status === 200) {
        let snippet = data.items[0]?.snippet;
        let duration = data.items[0].contentDetails.duration;
        let videoObject = {
          videoId,
          thumb: snippet?.thumbnails.medium.url,
          videoTitle: snippet?.title,
          channelTitle: snippet?.channelTitle,
          duration,
        };

        // save this duration in videoObject
        videosArray.push(videoObject);
      }
    }
    console.log(videosArray);
    dispatch({
      type: SET_VIDEOS,
      payload: videosArray,
    });
  };

  const calculateTotalDuration = () => {
    let totalDuration = 0;
    state.forEach((videoObject) => {
      totalDuration += convert_time(videoObject.duration);
    });

    setTotalTime(secondsToHms(totalDuration));
  };

  const toggleAddVideoDialog = () => {
    setOpenAddVideoDialog(!openAddVideoDialog);
  };
  const addSingleVideo = async () => {
    console.log(singleVideoLink);
    let videoId = getVideoId(singleVideoLink);
    // setVideoIDs([...videoIDs, videoId]);
    const { status, data } = await videoRequest.get("/videos", {
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
        duration: videoObject.contentDetails?.duration,
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
      setLoadingPlaylistVideo(false);
    }
  }, [playlistId]);

  // second this will run
  useEffect(() => {
    if (videoIDs.length !== 0) {
      setTotalResults(videoIDs.length);
      fetchVideoDetails();
    } else {
      console.log("wrong call");
    }
  }, [videoIDs]);

  // third this will run
  useEffect(() => {
    if (state.length !== 0) {
      setLoadingPlaylistVideo(false);
      calculateTotalDuration();
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

        {loadingPlaylistVideo ? (
          <div className={classes.progress}>
            <CircularProgress size={60} classes={classes.progress} />
          </div>
        ) : (
          <List className={classes.videoList}>
            {state.map((mVideo) => (
              <ListItem key={mVideo.videoId} maxWidth="100%">
                <VideoCard
                  mVideo={mVideo}
                  totalResults={totalResults}
                  setTotalResults={setTotalResults}
                />
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
