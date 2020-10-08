import  {API} from '../config/config';
import queryString from 'query-string'
import { saveAs } from 'file-saver';
import axios from 'axios';

export const getChkoutPrdts = (userid,token) => {
    return fetch(`${API}/checkout/${userid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const postChkoutPrdts= (buyerid,paymntid,token) =>{
    return fetch(`${API}/checkout/${buyerid}?pid=${paymntid}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getOrderList = (buyerid,token) => {
    return fetch(`${API}/myorders/${buyerid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getBuyerProfile = (buyerid,token) => {
    console.log('user===',buyerid, "token=== ",token )
    return fetch(`${API}/profile/${buyerid}`, {
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

export const updateBuyer = (userId, token,user) => {
    return fetch(`${API}/profile/${userId}`, {
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

export const createAndDownloadPdf = (oid) => {
    const oidUrl = `${API}/createpdf?oid=${oid}`;
    const pdfUrl = `${API}/fetchpdf`;
    axios.post(oidUrl)
      .then(() => axios.get(pdfUrl, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'invoice-'+oid+'.pdf');
      })
  }