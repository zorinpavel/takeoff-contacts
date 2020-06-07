import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchContacts, setContacts } from '../../actions/contacts';
import contacts from '../fixtures/contacts';

const authToken = 'myTest_authToken';
const defaultAuthState = { auth: { authToken } };
const createMockStore = configureMockStore([thunk]);


test('Should setup contacts', () => {
    const action = setContacts(contacts);

    expect(action).toEqual({
        type: 'SET_CONTACTS',
        contacts
    });
});


test('Should set contacts from database', (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(fetchContacts())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'SET_CONTACTS',
                contacts
            });

            done();
        });
});

