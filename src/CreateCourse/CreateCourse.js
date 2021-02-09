import {
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SET_VIDEOS } from "../context/action.types";
import { PlaylistContext } from "../context/PlaylistContext";
import { VideoListContext } from "../context/VideoListContext";
import { youtubeRequest, ytVideoRequest } from "../utils/youtubeAPI";
import VideoCard from "./VideoCard";
import { convert_time } from "../utils/functions";
import CourseForm from "./CourseForm";

const useStyles = makeStyles({
  heading: {
    padding: "0.3em",
    margin: "0.3em",
  },
  videoList: {
    maxHeight: "88vh",
    overflow: "auto",
    margin: "0.4em 0",
  },
  progress: {
    display: "block",
    textAlign: "center",
    margin: "25% 50% 0 25%",
  },
});

const CreateCourse = () => {
  const classes = useStyles();
  const { playlistId } = useContext(PlaylistContext);
  const { state, dispatch } = useContext(VideoListContext);

  const [loadingPlaylistItems, setLoadingPlaylistItems] = useState(true);
  const [loadingPlaylistVideo, setLoadingPlaylistVideo] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [durations, setDurations] = useState([]);
  const [totalTime,setTotalTime]=useState()

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
      // save data to context
      await dispatch({
        type: SET_VIDEOS,
        payload: videosArray,
      });
      setLoadingPlaylistItems(false);

      setTotalResults(data.pageInfo?.totalResults);
    }
  };

  const fetchVideoDurations = async () => {
    console.log("okk")
    setLoadingPlaylistVideo(true);
    let newVideosArray = [];
    console.log(durations);
    console.log("loop",state)
    for (const videoObject of state) {
      console.log("ok2",state);
      const { status, data } = await ytVideoRequest.get("/videos", {
        params: {
          id: videoObject.videoId,
        },
      });
      console.log(status);
      if (status === 200) {
        let duration = data.items[0].contentDetails.duration;
        setDurations([...durations, duration]);
        console.log("chaltay ka nakii");
        console.log(duration);
        // save this duration in videoObject and save further in context
        newVideosArray.push({ ...videoObject, duration });
      }
    }
    dispatch({
      type: SET_VIDEOS,
      payload: newVideosArray,
    });
    console.log(newVideosArray);
  };

  const calculateTotalDuration = () => {
    // console.log("calokfun")
    let totalDuration = 0;
    durations.forEach(async (dur) => {
      let secondsDur = await convert_time(dur);
      totalDuration += secondsDur;
      console.log(totalDuration);
    });
    // Hours, minutes and seconds
    // console.log("ata hours")
    var hrs = ~~(totalDuration / 3600);
    var min = ~~((totalDuration % 3600) / 60);
    var sec = ~~totalDuration % 60;
    console.log("total",totalDuration);
    const totalTime=totalDuration
  };

  useEffect(() => {
    if (playlistId) {
      fetchPlaylist();
       fetchVideoDurations();
      calculateTotalDuration();
    } else {
      setLoadingPlaylistItems(false);
      setLoadingPlaylistVideo(false);
    }
  }, [playlistId]);

  return (
    <div>
      <Container maxWidth={false}>
        <Grid container spacing={0}>
          {/* left half portion */}
          <Grid
            container
            item
            sm={6}
            spacing={2}
            direction="row"
            // justify="center"
            alignItems="center"
          >
            <Typography component="h5" variant="h5" className={classes.heading}>
              List of Videos for course
            </Typography>

            <div>
              <Typography component="p" variant="hp">
                Total Videos: {totalResults}
              </Typography>
            </div>

            {loadingPlaylistItems ? (
              <div className={classes.progress}>
                <CircularProgress size={60} classes={classes.progress} />
              </div>
            ) : (
              <List className={classes.videoList}>
                {state.map((mVideo) => (
                  <ListItem key={mVideo.videoId} maxWidth="100%">
                    <VideoCard mVideo={mVideo} />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          {/* right half portion */}
          <Grid container item sm={6}>
            <CourseForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateCourse;
