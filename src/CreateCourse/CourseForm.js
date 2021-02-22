import {
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
import { useState } from "react";
import "date-fns";

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
    padding: "0.2em",
  },
});

const CourseForm = ({ totalTime }) => {
  const classes = useStyles();
  // const [selectedDate, setSelectedDate] = useState();
  // const [value, setValue] = useState("");
  const [num, setNum] = useState("");
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState();

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   setRedirect("auth");
  // };

  const handleChange = (event) => {
    setNum(event.target.value);
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

  return (
    <Container>
      {/* if playlist id is fetched successfully, redirect to create course */}
      {redirect === "auth" ? <Redirect to="/auth" /> : null}
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
        />
        {totalTime ? <h1>Total duration:- {totalTime} </h1> : null}
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
          <span className={classes.text}>Lets start by setting a target!</span>
          <span className={classes.text}>
            How much time do you think you will take to complete this course ?!
          </span>
          <Grid container className={classes.gridContainer}>
            <Grid item sm={6}>
              <TextField
                id="filled-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                className={classes.inputNumber}
                // style={{ display: "inline" }}
              />
            </Grid>
            <Grid item sm={6}>
              <Select
                labelId="dropdown"
                id="dropdown"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={num}
                onChange={handleChange}
                className={classes.dropdown}
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
          {" "}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Let's Create this course!
          </Button>
        </footer>
      </form>
    </Container>
  );
};

export default CourseForm;
