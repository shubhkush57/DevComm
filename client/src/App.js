import {React,Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
const App = () =>{
  return (
    <Provider store = {store }>
  <Router>
    <Fragment>
      <Navbar />
     

    {/*we have to wrap everything in the routes and react.fragment.*/}
    <Routes>
        <Route exact path = '/' element={<Landing/>} />
    </Routes>
    <section className='container'>
    <Alert />
      <Routes>

        <Route exact path='/login' element= {<Login/>} />
        <Route exact path='/register' element= {<Register/>} />
      </Routes>
    </section>
    </Fragment>
  </Router>
  </Provider>
  );
}

export default App;
