import fetch from '../helpers/fetch';
import settings from '../settings';

export const setContacts = (contacts) => ({
    type: 'SET_CONTACTS',
    contacts
});

export const fetchContacts = (params = {}) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch({
        url: settings.API_URL + settings.CONTACTS_PATH,
        method: 'GET',
        params,
        authToken
    })
        .then(response => response.json())
        .then(contacts => {
            dispatch(setContacts(contacts));

            return Promise.resolve(contacts);
        })
        .catch(response => {

            if (process.env.NODE_ENV === 'development')
                console.error('fetch error', response);

            return Promise.reject(response);
        });

};
