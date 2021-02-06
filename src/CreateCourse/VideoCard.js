import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext, useState } from "react";
import { DELETE_VIDEO, EDIT_VIDEO_TITLE } from "../context/action.types";
import { VideoListContext } from "../context/VideoListContext";

const useStyles = makeStyles({
  card: {
    width: "100%",
  },
  deleteBtn: {
    color: "red",
  },
  editBtn: {
    color: "royalblue",
  },
});

const VideoCard = ({ mVideo }) => {
  const classes = useStyles();

  const { dispatch } = useContext(VideoListContext);
  const [editVideo, setEditVideo] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState("");

  const changeVal = (e) => {
    setNewVideoTitle(e.target.value);
  };

  const handleEditSubmit = () => {
    setEditVideo(false);
    dispatch({
      type: EDIT_VIDEO_TITLE,
      payload: newVideoTitle,
      id: mVideo.videoId,
    });
    mVideo.videoTitle = newVideoTitle;
  };

  const deleteVideo = () => {
    dispatch({
      type: DELETE_VIDEO,
      payload: null,
      id: mVideo.videoId,
    });
  };

  return (
    <Paper elevation={6} className={classes.card}>
      <Grid container spacing={0}>
        <Grid item lg={4}>
          <img src={mVideo.thumb} alt="video_thumb" width="200rem" />
        </Grid>
        <Grid item lg={6}>
          {editVideo ? (
            <>
              <TextField
                width="2em"
                onChange={changeVal}
                placeholder="new title"
                // value={mVideo.videoTitle}
              />
              <span onClick={handleEditSubmit}>
                <Button color="primary">Ok</Button>
              </span>
            </>
          ) : (
            <Typography variant="h6">{mVideo.videoTitle}</Typography>
          )}

          <Typography component="p">{mVideo.channelTitle}</Typography>
        </Grid>
        <Grid item lg={2} justify="center">
          <span
            onClick={() => {
              setEditVideo(true);
            }}
          >
            <IconButton size="medium">
              <EditIcon fontSize="default" className={classes.editBtn} />
            </IconButton>
          </span>
          <span onClick={deleteVideo}>
            <IconButton size="medium">
              <DeleteIcon fontSize="default" />
            </IconButton>
          </span>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VideoCard;
