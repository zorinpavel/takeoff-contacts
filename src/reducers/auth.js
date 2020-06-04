export default (state = {}, action) => {
    switch (action.type) {
    case 'LOGIN':
        return {
            uid: action.uid,
            authToken: action.authToken
        };
    case 'LOGOUT':
        return {};
    default:
        return state;
    }
};
