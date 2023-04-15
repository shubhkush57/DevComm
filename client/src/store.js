// it will be our redux-store..
// we need to bring reducers here one by one or we can combine them in a root-reducer and come it .
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const middleware = [thunk];
const initialState = {};
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;