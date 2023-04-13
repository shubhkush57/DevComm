import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () =>{
  return (
  <Router>
    <Navbar />
    {/*we have to wrap everything in the routes and react.fragment.*/}
    <Routes>
      <React.Fragment>
        <Route exact path = '/' element={<Landing/>} />
        <Route exact path='/login' element= {<Login/>} />
        <Route exact path='/register' element= {<Register/>} />
      </React.Fragment>
    </Routes>
  </Router>
  );
}

export default App;
