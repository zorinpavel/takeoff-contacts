import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase';
import configStore from './configStore';
import AppRouter, { history } from './routers/AppRouter';
import { logout, fetchToken } from './actions/auth';
import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
import './styles/styles.scss';


const store = configStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(fetchToken(user))
            .then(() => {
                renderApp();
                if (history.location.pathname === '/')
                    history.push('/dashboard');
            })
            .catch(error => {
                console.error('fetchToken error', error);
            });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});
