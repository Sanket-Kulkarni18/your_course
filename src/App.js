import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import HomePage from "./HomePage/HomePage";
import CreateCourse from "./CreateCourse/CreateCourse";

// states & components
import { useState } from "react";
import { PlaylistContext } from "./context/PlaylistContext";

const App = () => {
  const [playlistId, setPlaylistId] = useState("");

  return (
    <div className="App">
      <PlaylistContext.Provider value={{ playlistId, setPlaylistId }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/createCourse" component={CreateCourse} />
          </Switch>
        </BrowserRouter>
      </PlaylistContext.Provider>
    </div>
  );
};

export default App;
