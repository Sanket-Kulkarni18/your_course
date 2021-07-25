import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// firebase
import firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles({
  floatRight: {
    float: "right",
  },
  button: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "white",
      color: "royalblue",
    },
  },
});

const Navbar = () => {
  const classes = useStyles();

  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout");
        // setRedirect("home");
        setUser(null);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ flex: 1, color: "#ffffff", textDecoration: "none" }}
            component={Link}
            to="/profile"
          >
            Your Course
          </Typography>
          <Button
            color="inherit"
            className={classes.button}
            component={Link}
            to="/"
          >
            Home
          </Button>
          {user ? (
            <div className={classes.floatRight}>
              <Button
                color="inherit"
                className={classes.button}
                component={Link}
                to="/profile"
              >
                {" "}
                {user.email}{" "}
              </Button>
              <Button
                color="inherit"
                className={classes.button}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              color="inherit"
              className={classes.button}
              component={Link}
              to="/auth"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
