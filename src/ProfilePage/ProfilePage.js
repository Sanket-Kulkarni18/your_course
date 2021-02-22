import { List, ListItem, makeStyles, Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import CourseCard from "./CourseCard";

const useStyles = makeStyles({
  heroSection: {
    padding: "1em",
    backgroundColor: "royalblue",
    margin: "2em 0",
  },
  heroText: {
    fontSize: "1.8em",
    color: "white",
    // padding: "0.2em",
  },
  controls: {
    margin: "auto",
    backgroundColor: "red",
  },
  anchor: {
    // padding: "0.2em",
    fontSize: "1em",
  },
});

const initCourses = [
  {
    id: 1,
    name: "Javascript course",
    author: "Hitesh Choudhary",
    progress: 60,
  },
  { id: 2, name: "C++ bootcamp", author: "Telusko", progress: 20 },
  {
    id: 3,
    name: "Python complete web dev course",
    author: "CodeWithHarry",
    progress: 90,
  },
];

const ProfilePage = () => {
  const classes = useStyles();

  const [courses, setCourses] = useState(initCourses);
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        // if user is logged in
        <div>
          <div className={classes.controls}>
            <a href="/" className={classes.anchor}>
              Profile
            </a>
            <a href="/" className={classes.anchor}>
              Logout
            </a>
          </div>
          <div className={classes.heroSection}>
            <Typography className={classes.heroText}>
              Hi {user.userName},
              <br /> Welcome to <i>YourCourse</i> !
            </Typography>
          </div>
          <div className="courses">
            <Typography>Ongoing Courses</Typography>
            <List>
              {courses.map((course) => (
                <ListItem key={course.id}>
                  <CourseCard course={course} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      ) : (
        // if user is not logged in
        <p>No user logged in!</p>
      )}
    </>
  );
};

export default ProfilePage;
