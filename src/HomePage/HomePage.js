import "./HomePage.css";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { PlaylistContext } from "../context/PlaylistContext";

const useStyles = makeStyles({
  heading: {
    textAlign: "center",
    margin: "0.2em 0",
  },
  input: {
    margin: "1em",
  },
  button: {
    margin: "0 1em",
  },
});

const HomePage = () => {
  const classes = useStyles();
  // context values provided from context.provider
  const { setPlaylistId } = useContext(PlaylistContext);

  // states
  const [url, setUrl] = useState("");
  const [redirect, setRedirect] = useState();

  // functions
  const getIdFromUrl = (playlistURL) => {
    let startIndex = playlistURL.search("list=");
    startIndex += 5;
    playlistURL = playlistURL.substring(startIndex, playlistURL.length);

    let endIndex = playlistURL.search("&");
    endIndex = endIndex === -1 ? playlistURL.length : endIndex;

    let id = playlistURL.substring(0, endIndex);

    return id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPlaylistId(getIdFromUrl(url));
    setRedirect("createCourse");
  };
  return (
    <div>
      {/* if playlist id is fetched successfully, redirect to create course */}
      {redirect==="createCourse" ? <Redirect to="/createCourse" /> : null}
      <Container>
        <Typography variant="h3" className={classes.heading}>
          Welcome to <b>Your Course</b>
        </Typography>
        <form noValidate>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                fullWidth
                required
                variant="outlined"
                label="Playlist URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Fetch Playlist
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default HomePage;
