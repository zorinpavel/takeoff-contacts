export default (state = [], action) => {
    switch (action.type) {
    case 'ADD_CONTACT':
        return [
            ...state,
            action.contact
        ];
    case 'SET_CONTACTS':
        return action.contacts;
    case 'REMOVE_CONTACT':
        return state.filter(contact => contact._id !== action.id);
    case 'EDIT_CONTACT':
        return state.map(contact => {
            if (contact._id === action.id) {
                return {
                    ...contact,
                    ...action.updates
                };
            } else
                return contact;
        });
    default:
        return state;
    }
};
