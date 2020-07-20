import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap 4 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Menu from './component/menu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Movie from './component/Rutas/movie';
import Home from './component/Rutas/home';
import Favorite from './component/Rutas/favorite';
import Later from './component/Rutas/later';
import Search from './component/Rutas/vsearch'

function App() {
  return (

    <Router>
      <Menu />
      <Switch>
        <Route path="/waitinglist">
          <Later />
        </Route>
        <Route path="/favorite">
          <Favorite />
        </Route>
        <Route path="/search/:movie" component={Search} />
        <Route path="/movie/:movieId" component={Movie} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
