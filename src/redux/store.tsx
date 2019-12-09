import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export interface CatalogTask {
    Name: string,
    Description: string,
    Rating: number,
    Downloads: number,
    YAML: string
}
const initialState = {};

const middleware = [thunk];
export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware));
