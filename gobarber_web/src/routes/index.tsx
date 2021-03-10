import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/cadastre-se" component={SignUp} />
      <Route path="/esqueci-senha" component={ForgotPassword} />
      <Route path="/resetar-senha" component={ResetPassword} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}

export default Routes;
