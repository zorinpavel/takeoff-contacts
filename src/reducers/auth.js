export default (state = {}, action) => {
    switch (action.type) {
    case 'LOGIN':
        return {
            uid: action.user._id,
            authToken: action.authToken,
            user: action.user
        };
    case 'LOGOUT':
        return {};
    default:
        return state;
    }
};
