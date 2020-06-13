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


export const editContact = (id, updates) => ({
    type: 'EDIT_CONTACT',
    id,
    updates
});

export const fetchEditContact = (id, updates) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch({
        url: settings.API_URL + settings.CONTACTS_PATH + '/' + id,
        method: 'PATCH',
        params: updates,
        authToken
    })
        .then(response => response.json())
        .then(contact => {
            dispatch(editContact(id, contact));

            return Promise.resolve(contact);
        })
        .catch(response => {

            if (process.env.NODE_ENV === 'development')
                console.error('fetch error', response);

            return Promise.reject(response);
        });

};


export const addContact = (contact) => ({
    type: 'ADD_CONTACT',
    contact
});

export const fetchAddContact = (contact) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch({
        url: settings.API_URL + settings.CONTACTS_PATH,
        method: 'POST',
        params: contact,
        authToken
    })
        .then(response => response.json())
        .then(contact => {
            dispatch(addContact(contact));

            return Promise.resolve(contact);
        })
        .catch(response => {

            if (process.env.NODE_ENV === 'development')
                console.error('fetch error', response);

            return Promise.reject(response);
        });

};

export const fetchRandomContact = (params) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch({
        url: settings.API_URL + settings.CONTACTS_PATH + '/random',
        method: 'POST',
        params,
        authToken
    })
        .then(response => response.json())
        .then(contacts => {
            dispatch(addContact(contacts[0]));

            return Promise.resolve(contacts[0]);
        })
        .catch(response => {

            if (process.env.NODE_ENV === 'development')
                console.error('fetch error', response);

            return Promise.reject(response);
        });

};


export const removeContact = (id) => ({
    type: 'REMOVE_CONTACT',
    id
});

export const fetchRemoveContact = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch({
        url: settings.API_URL + settings.CONTACTS_PATH + '/' + id,
        method: 'DELETE',
        authToken
    })
        .then(response => response.json())
        .then(contact => {
            dispatch(removeContact(contact._id));

            return Promise.resolve(contact);
        })
        .catch(response => {

            if (process.env.NODE_ENV === 'development')
                console.error('fetch error', response);

            return Promise.reject(response);
        });

};

