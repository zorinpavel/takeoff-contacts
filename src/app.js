import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase';
import configStore from './configStore';
import AppRouter, { history } from './routers/AppRouter';
import { logout, fetchToken, postUser } from './actions/auth';
import { fetchContacts } from './actions/contacts';
import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
// import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
// import '@fortawesome/fontawesome-free/scss/solid.scss';
import './styles/styles.scss';


const store = configStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = (error = '') => {
    if (error)
        history.push('/help');

    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(fetchToken(user))
            .then(async () => {
                await store.dispatch(fetchContacts());

                renderApp();
                if (history.location.pathname === '/')
                    history.push('/dashboard');
            })
            .catch(error => {

                store.dispatch(postUser(user))
                    .then(async () => {
                        await store.dispatch(fetchContacts());

                        renderApp();
                        if (history.location.pathname === '/')
                            history.push('/dashboard');
                    })
                    .catch(error => {
                        store.dispatch(logout());
                        renderApp(error);
                        history.push('/');
                    });

                // store.dispatch(logout());
                // renderApp(error);
                // history.push('/');
            });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});
