import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import HomePage from "./HomePage/HomePage";
import CreateCourse from "./CreateCourse/CreateCourse";
import Authentication from "./auth/Authentication";
import ProfilePage from "./ProfilePage/ProfilePage";

// states & components
import { useReducer, useState } from "react";
import { PlaylistContext } from "./context/PlaylistContext";
import { VideoListContext } from "./context/VideoListContext";
import { UserContext } from "./context/UserContext";
import { reducer } from "./context/reducer";

const initialState = [];

const App = () => {
  const [playlistId, setPlaylistId] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState();

  return (
    <div className="App">
      <PlaylistContext.Provider
        value={{ playlistId, setPlaylistId, alertOpen, setAlertOpen }}
      >
        <VideoListContext.Provider value={{ state, dispatch }}>
          <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/createCourse" component={CreateCourse} />
                <Route exact path="/auth" component={Authentication} />
                <Route exact path="/profile" component={ProfilePage} />
              </Switch>
            </BrowserRouter>
          </UserContext.Provider>
        </VideoListContext.Provider>
      </PlaylistContext.Provider>
    </div>
  );
};

export default App;
