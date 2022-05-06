import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs, getTemps } from './redux/actions';
import Landing from './components/Landing.jsx';
import Main from './components/Main.jsx';
import DogDetail from './components/DogDetail.jsx';
import Favourites from './components/Favourites';
import CreateDog from './components/CreateDog';
import NotFound from './components/NotFound';
import Alert from './components/Alert.jsx';
import './App.css';

function App() {
  const alertMessage = useSelector((state) => state.alertMessage);
  const dispatch = useDispatch();
  // fetch dogs even before accessing the main page
  // probabley fetch again in main view in case a new dog was created?
  // I'm thinking of adding the dog to redux as well to show up first in main page before any sorting occurs
  // if it didn't it shouldn't update, but will it show the loader? it shouldn't because there will be initialState 🤔
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemps());
  });

  return (
    <div className='App'>
      {alertMessage && <Alert delay='3000' />}
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/dogs' component={Main} />
        <Route exact path='/dogs/:id' component={DogDetail} />
        <Route exact path='/dog' component={CreateDog} />
        <Route exact path='/favourites' component={Favourites} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
