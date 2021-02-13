import {
  Container,
  makeStyles,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import "date-fns";
import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles({
  textfield: {
    margin: "0.6em 0.3em",
  },
  button: {
    margin: "0 1em",
  },
});

const CourseForm = ({ totalTime }) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState();
  const [value, setValue] = useState("");
  const [num, setNum] = useState("");
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState();

  const handleClick = (event) => {
    event.preventDefault();
    setRedirect("auth");
  };

  const handleChange = (event) => {
    setNum(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleRadioChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

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
        {totalTime ? <h1>total duration {totalTime} </h1> : null}
        <form>
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
        </form>
        {value === "fixDate" ? (
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
        )}
        {value === "rawData" ? (
          <FormControl className={classes.formControl}>
            <span>set the number of (days/weeks/months)</span>
            <TextField
              id="filled-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              // style={{ display: "inline" }}
            />
            <Select
              labelId="dropdown"
              id="dropdown"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={num}
              onChange={handleChange}
              style={{ display: "inline" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"days"}>Days</MenuItem>
              <MenuItem value={"weeks"}>Weeks</MenuItem>
              <MenuItem value={"months"}>Months</MenuItem>
            </Select>
          </FormControl>
        ) : (
          " "
        )}
        <footer>
          {" "}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Set
          </Button>
        </footer>
      </form>
    </Container>
  );
};

export default CourseForm;
