export function projects(state = {}, action) {
    switch (action.type) {
        case 'PROJECTS_FETCH_SUCCESS':
            return action.projects;
        default:
            return state;
    }
}