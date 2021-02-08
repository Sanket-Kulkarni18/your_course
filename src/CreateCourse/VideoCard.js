import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext, useState } from "react";
import { DELETE_VIDEO, EDIT_VIDEO_TITLE } from "../context/action.types";
import { VideoListContext } from "../context/VideoListContext";
import { PlaylistContext } from "../context/PlaylistContext";

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
  thumbImg: {
    width: "12rem",
    margin: "0",
    padding: "0",
  },
  durationText: {
    backgroundColor: "#202020",
    borderRadius: "0.4em",
    color: "white",
    fontSize: "0.8em",
    display: "inline",
    padding: "0.2em",
    margin: "0 1.1em 0 0",
    float: "right",
  },
});

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const VideoCard = ({ mVideo }) => {
  const classes = useStyles();

  const { dispatch } = useContext(VideoListContext);
  const { alertOpen, setAlertOpen } = useContext(PlaylistContext);
  const [editVideo, setEditVideo] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

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
    setConfirmDeleteDialog(false);
    dispatch({
      type: DELETE_VIDEO,
      payload: null,
      id: mVideo.videoId,
    });
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlertOpen(false);
  };
  const toggleConfirmDelete = () => {
    setConfirmDeleteDialog(!confirmDeleteDialog);
  };

  return (
    <Paper elevation={6} className={classes.card}>
      <Grid container spacing={0}>
        <Grid item lg={4}>
          <img
            src={mVideo.thumb}
            alt="video_thumb"
            // width="240rem"
            className={classes.thumbImg}
          />
          {mVideo.duration ? (
            <div>
              <Typography component="p" className={classes.durationText}>
                {mVideo.duration}
              </Typography>
            </div>
          ) : null}
        </Grid>
        <Grid item lg={6}>
          {editVideo ? (
            <>
              <TextField
                width="2em"
                onChange={changeVal}
                placeholder="new title"
                defaultValue={mVideo.videoTitle}
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
          <span onClick={toggleConfirmDelete}>
            <IconButton size="medium">
              <DeleteIcon fontSize="default" />
            </IconButton>
          </span>
        </Grid>
      </Grid>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity="warning" onClose={handleAlertClose}>
          Deleted video from the Course!
        </Alert>
      </Snackbar>
      <div className="deleteDialog">
        <Dialog
          open={confirmDeleteDialog}
          onClose={toggleConfirmDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to Delete this video?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {
                "This video will be removed from the playlist & no longer will be available in Your Course"
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleConfirmDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteVideo} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  );
};

export default VideoCard;
