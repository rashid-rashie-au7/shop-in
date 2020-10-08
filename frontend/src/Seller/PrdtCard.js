import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import '../style.css';
import {isAuthenticate} from '../auth'; 

const PrdtCard = ({product}) => {

    
    const PrdtCardView = (product) => {
        const {user} = isAuthenticate();
        
            return(
                <div className="col-xl-3 col-lg-6 col-md-3 col-4">
                    <figure className="card card-product-grid">
                        <Link to={`/updateproduct/${product.prdtid}/${user.userid}`}>                    
                            <div className="img-wrap">   
                                <img src={product.imgpath1}/>
                            </div> 
                            <figcaption className="info-wrap">
                                <div className="title mb-2" >
                                    <span className="title mb-2" style={{ display:"inline"}}>{(product.prdtname)}</span> 
                                </div>
                                <p className="text-muted ">{product.brand}</p>
                                <div className="price-wrap">
                                    <span className="price">₹ {product.price}</span> 
                                    <small className="text-muted">/per item</small>
                                </div> 
                                <div className="price mt-1"> <p style={{fontSize: "24px" , fontWeight: "500", display: "inline", fontFamily:"Cochin"}}>₹ {product.offer} </p>  
                                <small className="badge badge-danger"style={{marginLeft: "10px", marginBottom:"15px"}}>{product.offer} % Off </small></div>
                                <div className="price " style={{color: "green"}}>Qty : {product.qty}</div>
                            </figcaption>
                        </Link>
                    </figure>
                </div>               
            )
    }
    return (
        <Fragment>
            {PrdtCardView(product)}
        </Fragment>
    )   
}
export default PrdtCard;