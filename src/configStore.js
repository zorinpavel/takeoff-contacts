import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import contactsReducer from './reducers/contacts';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            contacts: contactsReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
