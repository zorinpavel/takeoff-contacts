import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import HelpPage from '../components/HelpPage';
import EditContactPage from '../components/EditContactPage';
import AddContactPage from '../components/AddContactPage';


export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true} />
            <Route path="/help" component={HelpPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/create" component={AddContactPage} />
            <PrivateRoute path="/edit/:id" component={EditContactPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
);

export default AppRouter;
