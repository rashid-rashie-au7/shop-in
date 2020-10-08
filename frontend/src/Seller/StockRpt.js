import React, {useEffect,useState} from 'react';
import Layout from '../core/Layout';
import {getProducts} from './ApiSeller'
import  {isAuthenticate} from '../auth/index'

const StockRpt = () => {

    
    const [products,setProduct] = useState([])
    const [error,setError] = useState(false)
    const {user,token} = isAuthenticate();
    
    const loadProduct = () => {
        getProducts(user.userid,token).then(data => {
            if(data.error){
                console.log(data.error)
                setError(data.error)
            }else{
                setProduct(data)
            }      
        })
    }

    useEffect(() => {
        loadProduct()
        
    }, []);


    const stkRpt =() => {
        return (
            <div className="container" >
            <div className="row-sm">
                <div className="card">
                <table className="table table-borderless table-shopping-cart">
                <thead className="text-muted">
                    <tr className="small text-uppercase">
                        <th scope="col" width="30">sl.no</th>
                        <th scope="col"width="100">PrdtID</th>
                        <th scope="col"width="300">Product</th>
                        <th scope="col"width="200">Catgory</th>
                        <th scope="col" width="130">Brand</th>
                        <th scope="col" width="80">Qty</th>
                        <th scope="col" width="80">Price</th>
                        <th scope="col" width="80">gst</th>
                        <th scope="col" width="70">Status</th>
                    </tr>
                </thead>
               
                <tbody> 
                {products.map((product,i)=>(	
                    <tr key={i}>
                        <td> 
                            <var className="text">{++i} </var>
                        </td>
                        <td>
                            <var className="text">{product.prdtid} </var>  
                        </td>
                        <td> 
                            <var className="text">{product.prdtname} </var> 
                        </td>
                        <td> 
                            <var className="text">{product.catgy} </var> 
                        </td>
                        <td> 
                            <var className="text">{product.brand} </var> 
                        </td>
                        <td > 
                            <var className="text">{product.qty} </var> 
                        </td>
                        <td > 
                            <var className="text">{product.price} </var> 
                        </td>
                        <td > 
                            <var className="text">{product.gstper} </var> 
                        </td>
                        <td > 
                            <var className="text"> staus </var> 
                        </td>
                    </tr>
                ))} 
                </tbody>
                </table>
              
                </div> 
            </div>
        </div>

        )
    };
    return (
        <Layout >
            
                    {stkRpt()}    
        </Layout>
    )
}

export default StockRpt