import { client } from "../../Client";

export function projectsFetchSuccess(projects) {
    return {
        type: 'PROJECTS_FETCH_SUCCESS',
        projects
    }
}


export function getProjectsInfoFetch() {
    return (dispatch) => {
        client.getProjects()
            .then(res => res.json())
            .then(data => {
                dispatch(projectsFetchSuccess(data))
            }).catch(e => {
            throw new Error(e)
        })
    }
}