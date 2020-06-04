import { firebase, googleAuthProvider } from '../firebase';
import jwt from 'jsonwebtoken';
import fetch from '../helpers/fetch';
import settings from '../settings';

export const login = (uid, authToken) => ({
    type: 'LOGIN',
    uid,
    authToken
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

                dispatch(login(user._id, authToken));

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
