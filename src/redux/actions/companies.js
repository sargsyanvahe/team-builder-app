import { client } from "../../Client";

export function companiesFetchSuccess(companies) {
    return {
        type: 'COMPANIES_FETCH_SUCCESS',
        companies
    }
}

export function companiesFetchData() {
    return (dispatch) => {
        client.getCompanies()
            .then(companies => {
                dispatch(companiesFetchSuccess(companies))
            })
            .catch(e => {
                throw new Error(e)
            })
    }
}