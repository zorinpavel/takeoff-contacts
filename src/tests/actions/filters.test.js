import { setTextFilter } from '../../actions/filters';


test('Should generate text filter', () => {
    expect(setTextFilter('any')).toEqual({
        type: 'SET_TEXT_FILTER',
        textFilter: expect.any(String)
    });
});
