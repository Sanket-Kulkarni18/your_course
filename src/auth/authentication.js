import React,{useState,useContext} from 'react';
import { Redirect } from "react-router-dom";
import {userContext} from '../context/userContext';
import {Button,Grid,} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {firebaseConfig} from '../utils/youtubeAPI'
import firebase from 'firebase/app';
import "firebase/auth";
const Authentication=()=>{
	

 const [isLognedin, setIslognedin] = useState(false);

const {setUserState}=useContext(userContext);

 if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}
  const googleSignInPopup=(provider)=> {
    
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var {user}=result;
      setUserState({
        userName:user.displayName,
        profilepic:user.photoURL,
        uid:user.uid
      });
      setIslognedin(true);

    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
};
  const githubLogin=(provider)=> {
    
  var provider = new firebase.auth.GithubAuthProvider();
   firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      console.log("github");
      setIslognedin(true);

    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
};
const logout=()=>{
  firebase.auth().signOut().then(() => {
 console.log("logout")
}).catch((error) => {
  // An error happened.
});
}

	return(<>
  	{isLognedin ? <Redirect to="/profilepage" /> : null}
     <Container >
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '30vh',alignment:'center' }} >
        <h1><center>authentication</center></h1>
            </Typography>
        </Container>
}

<center>	
<Button variant="contained" color="secondary" onClick={googleSignInPopup} style={{margin: "5% 20% 0 20%"}}>
  Sign in with GOOGLE
</Button>
</center>
<center>  
<Button variant="contained" color="default" onClick={githubLogin} style={{margin: "1% 20% 0 20%"}}>
  Sign in with GitHub
</Button>
<Button variant="contained" color="default" onClick={logout} style={{margin: "1% 20% 0 20%"}}>
  logout
</Button>
</center>
		</>
		)
		
}

export default Authentication;