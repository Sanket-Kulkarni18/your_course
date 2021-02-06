import { Card, Grid, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    width: "100%",
  },
});

const VideoCard = ({ mVideo }) => {
  const classes = useStyles();

  return (
    <Paper elevation={6} className={classes.card}>
      <Grid container spacing={0}>
        <Grid item lg={4}>
          <img src={mVideo.thumb} alt="video_thumb" width="200rem" />
        </Grid>
        <Grid item lg={8}>
          <Typography variant="h6">{mVideo.videoTitle}</Typography>
          <Typography component="p">{mVideo.channelTitle}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VideoCard;
