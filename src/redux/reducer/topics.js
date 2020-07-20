export function topics(state = {}, action) {
    switch (action.type) {
        case 'TOPICS_FETCH_SUCCESS':
            return action.topics;
        default:
            return state;
    }
}