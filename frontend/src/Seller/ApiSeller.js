import  {API} from '../config/config';
import queryString from 'query-string'




export const createProduct = (userid,token,product) => {
    return fetch(`${API}/addproduct/${userid}`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization:  `Bearer ${token}`
        },
        body: JSON.stringify(product)
       
    })
    .then(response =>{
        console.log('prdtttt', JSON.stringify(product))
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const getProducts = (sellerid,token) => {
    console.log('user===',sellerid, "token=== ",token )
    return fetch(`${API}/products/${sellerid}`, {
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
        .catch(err => console.log(err));
};

export const getSingleProduct = (prdtid,userid,token) => {
    console.log('user===',prdtid, "token=== ",token )
    return fetch(`${API}/updateproduct/${userid}/${prdtid}`, {
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
        .catch(err => console.log(err));
};

export const getSellerProfile = (sellerid,token) => {
    console.log('user===',sellerid, "token=== ",token )
    return fetch(`${API}/sellerProfile/${sellerid}`, {
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
        .catch(err => console.log(err));
};

export const updateSeller = (userId, token,user) => {
    return fetch(`${API}/sellerprofile/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateProduct = (prdtid,userid,token,user) => {
    return fetch(`${API}/updateproduct/${userid}/${prdtid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (prdtid,userid, token,user) => {
    return fetch(`${API}/deleteproduct/${userid}/${prdtid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getSales = (sellerid,token,sdate,edate) => {

    return fetch(`${API}/salesreport/${sellerid}?sdate=${sdate}&edate=${edate}`, {
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
        .catch(err => console.log(err));
};

export const getOrders = (sellerid,token) => {
    return fetch(`${API}/listorders/${sellerid}`, {
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
        .catch(err => console.log(err));
};