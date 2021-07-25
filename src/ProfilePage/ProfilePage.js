import { List, ListItem, makeStyles, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import CourseCard from "./CourseCard";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { getUserData } from "../utils/functions";
import { Redirect } from "react-router-dom";

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
  const [redirect, setRedirect] = useState("");

  const {
    user,
    setUser,
    courseObj,
    setCourseObj,
    userCourse,
    setUserCourse,
  } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          setUser(getUserData(firebaseUser));
        } else {
          setRedirect("auth");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (courseObj && userCourse) {
        savePreviousCourse();
      } else {
        console.log("course not found");
      }
      // fetch all the courses under this user
      fetchCourses();
    } else {
      // no user found in
      console.log("user not found");
      setRedirect("auth");
    }
  }, []);

  const savePreviousCourse = async () => {
    // load some data like authorName & authorUid in courseObj
    // have some courses to save in database
    setCourseObj({
      ...courseObj,
      courseAuthor: user.userName,
      courseAuthorUid: user.uid,
    });
    setUserCourse({
      ...userCourse,
      courseAuthor: user.userName,
      courseAuthorUid: user.uid,
    });
    firebase
      .database()
      .ref(`/courses/${courseObj.courseId}`)
      .set(courseObj)
      .then(() => {
        // save data under users uid
        firebase
          .database()
          .ref(`/users/${user.uid}/courses/${courseObj.courseId}`)
          .set(userCourse)
          .then(() => {
            console.log("success ", userCourse);
            // after all data saving success=> redirect user to profile page
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCourses = async () => {
    firebase
      .database()
      .ref(`users/${user.uid}/courses`)
      .on("value", (snapshot) => {
        for (const [_, course] of Object.entries(snapshot.val())) {
          setCourses(course);
        }
      });
  };

  return (
    <>
      {redirect === "auth" ? <Redirect to="/auth" /> : null}
      {redirect === "home" ? <Redirect to="/" /> : null}
      {user ? (
        // if user is logged in
        <div>
          <div className={classes.heroSection}>
            <Typography className={classes.heroText}>
              Hi {user.userName},
              <br /> Welcome to <i>YourCourse</i> !
            </Typography>
          </div>
          <div className="courses">
            <Typography>Ongoing Courses</Typography>
            <List>
              {courses.length && courses.map((course) => (
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
