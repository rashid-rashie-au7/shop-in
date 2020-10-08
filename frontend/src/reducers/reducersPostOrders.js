import {POST_ORDERS} from '../actions/types';

const initialState = []
const reducerPostOrders = (state=initialState,action) => {
    const {payload,type} = action;
    switch(type){
        case POST_ORDERS:
            return [...state,payload]
        default : return state;
    }

}

export default reducerPostOrders;