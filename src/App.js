import React, { useEffect } from 'react';
import './App.css';
import Chat from './container/Chat';
import Sidebar from './container/Sidebar';
import { Route, Switch } from 'react-router-dom';
import Login from './container/Login';
import { useStateValue } from './Context/StateProvider';
import { auth } from './config/firebase';
function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <div className="app__top"></div>
      {!user ? (
        <Login />
      ) : (
        <div className="app__container">
          <Sidebar />
          <Switch>
            <Route exact path="/" />
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
