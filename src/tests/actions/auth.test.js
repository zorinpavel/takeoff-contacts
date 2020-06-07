import { login, logout } from '../../actions/auth';


test('Should generate login action', () => {
    const user = { _id: 'abc123' };
    const authToken = 'abc123akghkjsfdgsdf';
    const action = login(user, authToken);

    expect(action).toEqual({
        type: 'LOGIN',
        uid: user._id,
        authToken,
        user
    });
});


test('Should generate logout action', () => {
    const action = logout();

    expect(action).toEqual({
        type: 'LOGOUT'
    });
});
