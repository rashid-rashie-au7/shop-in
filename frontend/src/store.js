import { createStore, applyMiddleware } from 'redux';  
import thunk from "redux-thunk"; 
import allReducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension'

const middleware = [thunk]
const initialState ={}
const store = createStore(allReducers,initialState,composeWithDevTools(applyMiddleware(...middleware)) );



export default store;