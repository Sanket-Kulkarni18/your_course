import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import "date-fns";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { PlaylistContext } from "../context/PlaylistContext";
import { getUserData, secondsToHms } from "../utils/functions";
import { VideoListContext } from "../context/VideoListContext";
import { playlistRequest } from "../utils/youtubeAPI";

const useStyles = makeStyles({
  formControl: {
    width: "100%",
  },
  text: {
    margin: "0.2em 0.4em",
    fontSize: "1.2em",
  },
  textfield: {
    margin: "0.6em 0.3em",
  },
  gridContainer: {
    margin: "1em",
  },
  button: {
    width: "100%",
    margin: "1em 0.8em",
    padding: "0.8em",
    borderRadius: "0.8em",
    fontSize: "1.0em",
  },
  inputNumber: {
    margin: "1em 0",
    width: "100%",
  },
  dropdown: {
    width: "80%",
    margin: "1em",
  },
  progress: {
    color: "#ffffff",
  },
});

const CourseForm = ({ totalTime }) => {
  const classes = useStyles();
  // const [selectedDate, setSelectedDate] = useState();
  // const [value, setValue] = useState("");

  const { user, setUser, setCourseObj, setUserCourse } = useContext(
    UserContext
  );
  const { playlistId } = useContext(PlaylistContext);
  const { state } = useContext(VideoListContext);

  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState();
  const [loading, setLoading] = useState(false);

  const [courseThumb, setCourseThumb] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [channelTitle, setChannelTitle] = useState("");
  const [numDuration, setNumDuration] = useState("");
  const [unitOfDuration, setUnitOfDuration] = useState("");

  useEffect(() => {
    if (playlistId) {
      requestPlaylistDetails();
    }
    if (!user) {
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          setUser(getUserData(firebaseUser));
        }
      });
    }
  }, []);

  const requestPlaylistDetails = async () => {
    const { status, data } = await playlistRequest.get("/playlists", {
      params: {
        id: playlistId,
      },
    });
    if (status === 200) {
      let snippet = data.items[0]?.snippet;
      setCourseTitle(snippet.title);
      setCourseDescription(
        snippet.description
          ? snippet.description
          : `${snippet.title} by ${snippet.channelTitle}`
      );
      setCourseThumb(snippet.thumbnails?.medium.url);
      setChannelTitle(snippet.channelTitle);
    }
  };

  const handleChange = (event) => {
    setUnitOfDuration(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
  // const handleRadioChange = (e) => {
  //   e.preventDefault();
  //   setValue(e.target.value);
  // };

  const createCourseDetails = () => {
    // store the course globally
    let courseId = firebase.database().ref("courses").push().key;
    let courseObj = {
      courseId,
      playlistId: playlistId,
      courseTitle,
      courseDescription,
      courseThumb,
      channelTitle,
      totalDuration: totalTime,
      videos: state,
    };
    // store same course for particular user
    let userCourse = {
      ...courseObj,
      targetTime: numDuration,
      targetUnit: unitOfDuration,
      percentCompleted: 0,
    };
    setCourseObj(courseObj);
    setUserCourse(userCourse);
    setLoading(false);
  };

  const handleCourseSubmit = () => {
    if (playlistId) {
      // start loader
      setLoading(true);
      // create and save course objects in user-context
      createCourseDetails();
      setLoading(false);
      user ? setRedirect("profile") : setRedirect("auth");
    } else {
      setRedirect("playlist");
    }
  };

  return (
    <Container>
      {/* if playlist id is fetched successfully, redirect to create course */}
      {redirect === "auth" ? <Redirect to="/auth" /> : null}
      {redirect === "profile" ? <Redirect to="/profile" /> : null}
      <form>
        <Typography component="h3" variant="h3">
          Course Details
        </Typography>
        <TextField
          type="text"
          label="Course Name"
          placeholder="course name"
          variant="outlined"
          fullWidth
          required
          className={classes.textfield}
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          placeholder="any description you want to give to this course!"
          className={classes.textfield}
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
        <Grid container>
          <Grid item lg={6}>
            <img src={courseThumb} alt="course_thumbnail" />
          </Grid>
          <Grid item lg={6}>
            {totalTime ? (
              <>
                <Typography variant="h6">Total duration (HH:MM:SS)</Typography>
                <br />{" "}
                <Typography variant="h3">{secondsToHms(totalTime)}</Typography>
              </>
            ) : null}
          </Grid>
        </Grid>

        {/*<form>
           <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              Let's start by deciding your goal of completing this course!
              <br />
            </FormLabel>
            <RadioGroup
              aria-label="Type of Duration you want to SET"
              name="date set"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="rawData"
                control={<Radio />}
                label="Duration in approx. days/weeks/months"
              />
              <FormControlLabel
                value="fixDate"
                control={<Radio />}
                label="Duration with fix dates"
              />
            </RadioGroup>
          </FormControl>
        </form> */}
        {/* {value === "fixDate" ? (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Start date"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End date"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        ) : (
          ""
        )} */}
        {/* {value === "rawData" ? ( */}
        <FormControl className={classes.formControl}>
          <Typography variant="h6">
            Lets start by setting a target!
            <br />
            How much time do you think you will take to complete this course ?!
          </Typography>
          {/* <span className={classes.text}></span>
          <span className={classes.text}></span> */}
          <Grid container className={classes.gridContainer}>
            <Grid item xs={6}>
              <TextField
                id="filled-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                className={classes.inputNumber}
                value={numDuration}
                onChange={(e) => setNumDuration(e.target.value)}
                // style={{ display: "inline" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                labelId="dropdown"
                id="dropdown"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={unitOfDuration}
                onChange={handleChange}
                className={classes.dropdown}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"days"}>Days</MenuItem>
                <MenuItem value={"weeks"}>Weeks</MenuItem>
                <MenuItem value={"months"}>Months</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </FormControl>
        {/* ) : (
          " "
        )} */}
        <footer>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleCourseSubmit}
          >
            {loading ? (
              <div className={classes.progress}>
                <CircularProgress className={classes.progress} />
              </div>
            ) : (
              "Create this course for me!"
            )}
          </Button>
        </footer>
      </form>
    </Container>
  );
};

export default CourseForm;
