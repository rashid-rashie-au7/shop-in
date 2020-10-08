import {LIST_ORDERS} from '../actions/types';

const initialState = []
const reducerOrderList = (state=initialState,action) => {
    const {payload,type} = action;
    switch(type){
        case LIST_ORDERS:
            return [...state,payload]
        default : return state;
    }

}

export default reducerOrderList;