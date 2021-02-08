import {
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  textfield: {
    margin: "0.6em 0.3em",
  },
});

const CourseForm = () => {
  const classes = useStyles();

  return (
    <Container>
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
      </form>
    </Container>
  );
};

export default CourseForm;
