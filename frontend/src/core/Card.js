import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
// import '../style.css';
import './card.css';

 

const Card = ({product,cardType}) => {

    const cardBadge = (cardType) =>{
        if(cardType==='new'){
            return(
                <div className="ribbon">
                <span className="ribbon3" style={{color:'#ffffff'}}> NEW </span>
                </div>
            ) 
        } else if(cardType==='offer'){
            return(
                <div className="ribbon">
                <span className="ribbon6" style={{color:'#ffffff'}}> Best Offers </span>
                </div>
            )
        } 
            
        
    }

    const checkStock = qty => {
        return qty > 0 ? (
            qty > 5 ?(<dd className="col-sm-9" style ={{color:"Green", fontSize:'18px', fontWeight:'200px'}}>In Stock</dd> 
            ) : ( <dd className="col-sm-9 " style ={{color:"#ff4757",fontSize:'18px', fontWeight:'200px'}}>Limited Stocks..!</dd>)
            ) : ( <dd className="col-sm-9 " style ={{color:"#eb3b5a",fontSize:'18px', fontWeight:'200px'}}>Out of Stock</dd> );
    };


 
    return(
        <div className="col-xl-3 col-lg-6 col-md-3 col-4">
            
            <figure className="card card-product-grid">
                
                <Link to={`/detailproduct/${product.prdtid}`}>                    
                    <div className="img-wrap"> 
                        <img src={product.imgpath1}/>
                       {cardBadge(cardType)}
                    </div> 
                    <figcaption className="info-wrap">
                        <div className="title mb-2" style={{overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} >
                            <span className="title mb-2" >{(product.prdtname)}</span> 
                        </div>
                        <p className="text-muted "style={{overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}}>{product.brand}</p>
                        <hr/>
                        <div className="price mt-1"> <p style={{fontSize: "24px" , fontWeight: "500", display: "inline"}}>₹ {(product.price-(product.price*product.offer/100)).toFixed(2)} </p>  
                        <small className="badge badge-danger">{product.offer} % Off </small></div>
                        <div className="price-wrap">
                            <span className="price">₹ {product.price}</span> 
                            <small className="text-muted">/per item</small>
                        </div>  
                        {checkStock(product.qty)}
                    </figcaption>
                </Link>
            </figure>
        </div>               
    )

    
}

export default Card;