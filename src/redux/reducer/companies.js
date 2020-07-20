export function companies(state = [], action) {
    switch (action.type) {
        case 'COMPANIES_FETCH_SUCCESS':
            return action.companies;
        default:
            return state;
    }
}