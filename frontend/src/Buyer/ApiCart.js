import  {API} from '../config/config';
import queryString from 'query-string'

export const addCart = (userid,prdtid,token) => {
    console.log("buyer == ",userid,"/n prdt ===",prdtid,"/n token == ",token)
    return fetch(`${API}/addcart/${userid}/${prdtid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};


export const getCart = (buyerid,token) => {
    return fetch(`${API}/mycart/${buyerid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateCart = (userid,prdtid,status,token) => {
    return fetch(`${API}/updatecart/${userid}/${prdtid}?status=${status}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const addWishlist = (buyerid,prdtid,token)=> {
    return fetch(`${API}/mywishlist/${buyerid}/${prdtid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }, 
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};


export const getWishlist = (userid,token) => {
    return fetch(`${API}/wishlist/${userid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const removeCart = (userid,prdtid,token) => {
    return fetch(`${API}/removecart/${userid}/${prdtid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeWishlist = (buyerid,prdtid,token) => {
    return fetch(`${API}/removewishlist/${buyerid}/${prdtid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};




