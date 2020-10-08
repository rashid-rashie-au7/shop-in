import {LIST_ORDERS,POST_ORDERS} from './types'
import  {API} from '../config/config';

export const getOrders = (sellerid,token) => async(dispatch) => {
    try {
        await fetch(`${API}/listorders/${sellerid}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then((data)=> dispatch({
            type:LIST_ORDERS,
            payload: data
        }))
        
    } catch (err) {
        console.log(err)
        
    }     
};

export const postOrders = (sellerid,oid,prdt,token) => async(dispatch) => {
    try {
        await fetch(`${API}/updateorders/${sellerid}/?oid=${oid}&prdt=${prdt}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then((data)=> dispatch({
            type:POST_ORDERS,
        }))
        
    } catch (err) {
        console.log(err)
        
    }     
};