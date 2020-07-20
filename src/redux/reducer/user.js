export function user(state = {}, action) {
    switch (action.type) {
        case 'DATA_FETCH_SUCCESS':
            return { ...action.userData, isLogged: true };
        case 'LOGOUT_USER_SUCCESS':
            return {};
        default:
            return state;
    }
}