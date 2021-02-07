import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import HomePage from "./HomePage/HomePage";
import CreateCourse from "./CreateCourse/CreateCourse";

// states & components
import { useReducer, useState } from "react";
import { PlaylistContext } from "./context/PlaylistContext";
import { VideoListContext } from "./context/VideoListContext";
import { reducer } from "./context/reducer";

const initialState = [];

const App = () => {
  const [playlistId, setPlaylistId] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <PlaylistContext.Provider
        value={{ playlistId, setPlaylistId, alertOpen, setAlertOpen }}
      >
        <VideoListContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/createCourse" component={CreateCourse} />
            </Switch>
          </BrowserRouter>
        </VideoListContext.Provider>
      </PlaylistContext.Provider>
    </div>
  );
};

export default App;
