import { combineReducers } from 'redux';
import slideShowReducer from './reducerSlideShow';
import reducerOrderList from './reducerOrderList'

const allReducers = combineReducers({
    currentImageID: slideShowReducer,
    reducerOrderList:reducerOrderList
});



export default allReducers;