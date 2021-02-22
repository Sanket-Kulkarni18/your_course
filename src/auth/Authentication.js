import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { firebaseConfig } from "../utils/youtubeAPI";
import firebase from "firebase/app";
import "firebase/auth";

const Authentication = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUser({
          uid: user.uid,
          userName: user.displayName,
          profilePic: user.photoURL,
          email: user.email,
        });
        console.log(user);
      } else {
        console.log("no user signed in!");
        // setIsLoggedIn(true);
      }
    });
  }, []);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const signInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
  };
  const githubLogin = (provider) => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        console.log("github");
        // setIslognedin(true);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
  };
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {user ? <Redirect to="/profile" /> : null}
      <Container>
        <Typography
          component="div"
          style={{
            backgroundColor: "#cfe8fc",
            alignment: "center",
          }}
        >
          <h1>
            <center>authentication</center>
          </h1>
        </Typography>
      </Container>
      <center>
        <Button
          variant="contained"
          color="secondary"
          onClick={signInWithGoogle}
          style={{ margin: "5% 20% 0 20%" }}
        >
          Sign in with GOOGLE
        </Button>
      </center>
      <center>
        {/* <Button
          variant="contained"
          color="default"
          onClick={githubLogin}
          style={{ margin: "1% 20% 0 20%" }}
        >
          Sign in with GitHub
        </Button> */}
        <Button
          variant="contained"
          color="default"
          onClick={logout}
          style={{ margin: "1% 20% 0 20%" }}
        >
          logout
        </Button>
      </center>
    </>
  );
};

export default Authentication;
