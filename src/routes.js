import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import ChangeProfile from './components/ChangeProfile/ChangeProfile';
import Profile from './components/Profile/Profile';
import Dashboard from './components/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound';



const Routes = () => (
  <BrowserRouter>
  <div>
      <Switch>    
          <Route exact path="/" component={Welcome}/>
          <Route path="/changeprofile" component={ChangeProfile}/>
          <Route path="/profile/:id" component={Profile}/>
          <Route path="/profile" component={Profile} />
          <Route path="/userslist" component={Dashboard}/>
          <Route path="/map" component={Dashboard}/>
          <Route path="*" component={NotFound}/>
      </Switch>
      </div>
  </BrowserRouter>
);

export default Routes;