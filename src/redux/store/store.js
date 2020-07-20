import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from '../reducer'

export default function configureStore(initialState) {

    const enhancer = applyMiddleware(thunk);

    return createStore(
        reducer,
        initialState,
        enhancer
    );
}