import React,{useState,useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getSales} from './ApiSeller'
import  {isAuthenticate} from '../auth/index'


const SalesRpt = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [Enddate, setEndDate] = useState(new Date());
    const {user,token} = isAuthenticate();
    const [sales,setSales] = useState([])

    const loadProduct = () => {
        getSales(user.userid,token,startDate,Enddate).then(data => {
            if(data.error){
                console.log(data.error)
                // setError(data.error)
            }else{

                setSales(data)
            }      
        })
    }

    useEffect(() => {
        loadProduct()
        
    }, []);

    const handleClick = e => {
        e.preventDefault();
        loadProduct()
    };


    const salesRpt =() => {
        return (
            <div className="container mt-3" >
                
                        <div className="form-row">
                            <div className="col form-group ml-2">
                                <label>From Date : </label>
                                <DatePicker className="ml-3" selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <div className="col form-group">
                                <label>To Date :  </label> 
                                <DatePicker className="ml-3" selected={Enddate} onChange={date => setEndDate(date)} />    
                            </div> 

                                <div className="col form-group">
                                   <button onClick={handleClick} className="btn btn-primary"> Search </button>   
                                </div> 
                        </div>
                <div className="card">
                
                <table className="table  ">
                <thead className="text-muted">
                    <tr className="small text-uppercase">
                        <th scope="col" width="15">S.N</th>
                        <th scope="col"width="70">ID</th>
                        <th scope="col"width="75">Date</th>
                        <th scope="col"width="200">Product</th>
                        <th scope="col"width="75">Catgy</th>
                        <th scope="col" width="85">Brand</th>
                        <th scope="col" width="50">Qty</th>
                        <th scope="col" width="85">Price</th>
                        <th scope="col" width="85">Total</th>
                        <th scope="col" width="75">TransID</th>
                        <th scope="col" width="100">buyer</th>
                        <th scope="col" width="200">Address</th>
                    </tr>
                </thead>
               
                <tbody> 
                {sales.map((sales,i)=>(
                    <tr key={i}>
                        <td> 
                            <var className="text">{++i} </var> 
                        </td>
                        <td>
                            <var className="text">{sales.oid} </var>  
                        </td>
                        <td> 
                            <var className="text">{sales.date} </var>
                        </td>
                        <td> 
                            <var className="text">{sales.prdtname} </var>
                        </td>
                        <td> 
                            <var className="text">{sales.catgy} </var>
                        </td>
                        <td> 
                            <var className="text">{sales.brand} </var>
                        </td>
                        <td > 
                            <var className="text">{sales.qty} </var>
                        </td>
                        <td > 
                            <var className="text">₹ {(sales.offer).toFixed(2)} </var><br/>
                            <small className="text-muted">₹ {(sales.price).toFixed(2)}</small> 
                        </td>

                        <td > 
                            <var className="text">{(sales.total).toFixed(2)} </var>
                        </td>
                        <td > 
                            <var className="text">{sales.transid} </var>
                        </td>
                        <td > 
                            <var className="text">{sales.buyer} </var>
                        </td>
                        <td > 
                            <var className="text">{sales.addrs} </var>
                        </td>
                    </tr>
                    ))} 
                </tbody>
                </table>
              
                </div> 
        
        </div>

        )
    };
    return (
        <div>
            
                    {salesRpt()}    
       </div>
    )
}

export default SalesRpt