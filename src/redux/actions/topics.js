import { client } from "../../Client";

export function topicsFetchSuccess(topics) {
    return {
        type: 'TOPICS_FETCH_SUCCESS',
        topics
    }
}


export function getTopicsInfoFetch() {
    return (dispatch) => {
        client.getTopics()
            .then(res => res.json())
            .then(data => {
                dispatch(topicsFetchSuccess(data))
            }).catch(e => {
            throw new Error(e)
        })
    }
}