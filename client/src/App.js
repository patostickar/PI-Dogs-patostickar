import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getTemps } from "./redux/actions";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Dogs from "./components/Dogs.jsx";

function App() {
  const dispatch = useDispatch();
  // fetch dogs even before accessing the main page
  // probabley fetch again in main view in case a new dog was created?
  // I'm thinking of adding the dog to redux as well to show up first in main page before any sorting occurs
  // if it didn't it shouldn't update, but will it show the loader? it shouldn't because there will be initialState 🤔
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemps());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <>
          <Navbar />
          <Route exact path="/dogs" component={Dogs} />
        </>
      </Switch>
    </div>
  );
}

export default App;
