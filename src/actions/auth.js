import { firebase, googleAuthProvider } from '../firebase';
import jwt from 'jsonwebtoken';
import fetch from '../helpers/fetch';
import settings from '../settings';

export const login = (user, authToken) => ({
    type: 'LOGIN',
    uid: user._id,
    authToken: authToken,
    user: user
});

export const fetchToken = (user = {}) => {
    return (dispatch) => {
        const { email } = user;
        const token = jwt.sign({ email: email.toString() }, process.env.JWT_SECRET);

        return fetch({
            url: settings.API_URL + settings.USERS_PATH_LOGIN,
            method: 'POST',
            params: {
                email,
                token
            },
        })
            .then(response => response.json())
            .then(payload => {
                const { user, authToken } = payload;

                dispatch(login(user, authToken));

                return Promise.resolve();
            })
            .catch(response => {

                if (process.env.NODE_ENV === 'development')
                    console.error('fetch error', response);

                return Promise.reject(response);
            });
    };
};

export const postUser = (user = {}) => {
    return (dispatch) => {
        return fetch({
            url: settings.API_URL + settings.USERS_PATH,
            method: 'POST',
            params: {
                email: user.email,
                name: user.displayName,
                password: user.uid
            },
        })
            .then(response => response.json())
            .then(payload => {
                const { user, authToken } = payload;

                dispatch(login(user, authToken));

                return Promise.resolve();
            })
            .catch(response => {

                if (process.env.NODE_ENV === 'development')
                    console.error('fetch error', response);

                return Promise.reject(response);
            });
    };
};

export const startLogin = () => {
    return () => firebase.auth().signInWithPopup(googleAuthProvider);
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => firebase.auth().signOut();
};
