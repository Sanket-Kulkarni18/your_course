import {
  Box,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    width: "60%",
    margin: "0.2em auto",
    padding: "1.2em",
    borderRadius: "0.8em",
    elevation: "2",
  },
  linearProgress: {
    margin: "0.4em",
    height: "0.32em",
    borderRadius: "0.4em",
  },
});

const CourseCard = ({ course }) => {
  const classes = useStyles();
  return (
    <Paper elevation={6} className={classes.card}>
      <div>
        <Typography>{course.name}</Typography>
      </div>
      <div>
        <Typography>{course.author}</Typography>
      </div>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={course.progress}
            className={classes.linearProgress}
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {course.progress}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CourseCard;
