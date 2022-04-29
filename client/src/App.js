import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDogs, getTemps } from './redux/actions';
import Landing from './components/Landing.jsx';
import Dogs from './components/Dogs.jsx';
import DogDetail from './components/DogDetail.jsx';
import './App.css';

function App() {
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
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/dogs' component={Dogs} />
        <Route exact path='/dogs/:id' component={DogDetail} />
        <Route path='*'>
          <h1>404</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
