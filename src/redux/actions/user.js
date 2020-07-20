import { client } from "../../Client";

export function dataFetchSuccess(userData) {
    return {
        type: 'DATA_FETCH_SUCCESS',
        userData
    }
}

export function logoutUserSuccess() {
    return {
        type: 'LOGOUT_USER_SUCCESS'
    }
}

export function getUserInfoFetch() {
    return (dispatch) => {
        client.getUserData()
            .then(res => res.json())
            .then(userData => {
                dispatch(dataFetchSuccess(userData))
            }).catch(e => {
            throw new Error(e)
        })
    }
}


export function logoutFetch() {
    return (dispatch) => {
        client.logout()
            .then(res => {
                if (res.ok) {
                    // client.removeToken();
                    dispatch(logoutUserSuccess());
                }
            })
    }
}