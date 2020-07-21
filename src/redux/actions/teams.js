import { client } from "../../Client";

export function teamsFetchSuccess(teams) {
    return {
        type: 'TEAMS_FETCH_SUCCESS',
        teams
    }
}


export function getTeamsInfoFetch() {
    return (dispatch) => {
        client.getTeams()
            .then(res => res.json())
            .then(data => {
                dispatch(teamsFetchSuccess(data))
            }).catch(e => {
            throw new Error(e)
        })
    }
}