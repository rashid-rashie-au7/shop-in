import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticate} from '../auth'
import {getProducts} from './ApiSeller'
import {Link} from 'react-router-dom'
import PrdtCard from  '../Seller/PrdtCard';


const SellerHome = () => {
    const [products,setProduct] = useState([])
    const [error,setError] = useState(false)
    const {user,token} = isAuthenticate();

    const loadProducts = () => {
        getProducts(user.userid,token).then(data => {
            console.log("data== ",data)
            if(data.error){
                setError(data.error)
            } else{
                setProduct(data)
            }            
        })
    }

    useEffect(() => {
        loadProducts()
        
    }, []);

    const showProducts = () =>{
        if(products.length > 0){
            return(
                <div className="row "> 
                   {products.map((product,i) =>(
                        <PrdtCard key={i} product={product} />
                    ))}   
                </div>
                 
            )
        } else {
			return (
				<div style={{textAlign: "center", marginTop: "5px" }}>
					
					<img src="/images/Cards/noprdt.png " style={{justifyContent: "center"}} />	  
					<div>
						<Link to="addproduct" className="btn btn-light" style={{color:"#aa5279", backgroundColor:'#fdf6d8'}}> <i className="fa fa-chevron-left"></i> Please Add Product </Link>
					</div> 
				</div> 	
			)
		}
        
    }

    return (
        <div className="row">
            <div className="container">
                {showProducts()}
            </div>  
        </div>       
    )
}

export default SellerHome