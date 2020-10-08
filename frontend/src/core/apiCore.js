import  {API} from '../config/config';
import queryString from 'query-string'

export const getProducts = sortBy => {
    return fetch(`${API}/buyerhome?sortBy=${sortBy}&order=desc&limit=8`,{
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
};

export const getPrdtData = (prdtid) => {
    return fetch(`${API}/detailproduct/${prdtid}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getFilterdData = (skip,limit,filters ={}) => {
    console.log(skip,limit,filters,"get filterrrrrr")
    const data ={
        limit,skip,filters
    };
    return fetch(`${API}/search`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify(data)   
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const getSearchData = params => {
    const query = queryString.stringify(params)
    console.log(query)
    return fetch(`${API}/productsearch?${query}`,{
        method: 'GET'  
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
};

export const similiarProducts = (productId) => {
    return fetch(`${API}/similiar/${productId}`,{
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
};