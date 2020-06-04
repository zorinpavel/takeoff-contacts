import { login, logout } from '../../actions/auth';


test('Should generate login action', () => {
    const uid = 'abc123';
    const authToken = 'abc123akghkjsfdgsdf';
    const action = login(uid, authToken);

    expect(action).toEqual({
        type: 'LOGIN',
        uid,
        authToken
    });
});


test('Should generate logout action', () => {
    const action = logout();

    expect(action).toEqual({
        type: 'LOGOUT'
    });
});
