import React ,{useState,useEffect}from 'react';
import {getWishlist,removeWishlist} from './ApiCart';
import  {isAuthenticate} from '../auth/index'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'

const Wishlist = () => {
    const {user,token} = isAuthenticate();
	const [products,setProducts]=useState([])
    const [error,setError]=useState(false)
    const history = useHistory()
    const [success,setSuccess]=useState(false)

	const loadWishlist =() => {
        getWishlist(user.userid,token).then(data => {
            if(data.error){
                setError(data.error)
            } else{
                setProducts(data)
            }            
        })
    }

    const RemoveWishlist =(prdtid) => {
        removeWishlist(user.userid,prdtid,token).then(data => {
            if(data.error){
                setError(data.error)
            } else{
                window.location.reload();
               setSuccess(true)
            }            
        })
    }

    const showWishlist = () => {
        if(products.length>0){
            return(
                <div className="container">
                <div className="row">
                    <main className="col-md-12">
                        <header className="section-heading heading-line">
                            <h4 className="title-section text-uppercase"><i className="fa fa-heart"></i> My Wishlist</h4>
                        </header>
                        <header className="mb-3">
                            <div className="form-inline">
                                <strong className="mr-md-auto">{products.length} items found </strong>
                            </div>
                        </header>
                        <article className="card card-product-list">
                        {products.map((product,i)=>(
                            <div className="row no-gutters">
                                <aside className="col-sm-2 col-md-2">
                                  <div className="img-wrap " style={{margin: '20px 20px 20px 20px', borderRadius: '5px'}} >
                                        <img src={product.imgpath1}/>
                                    </div>
                                </aside>
                                <div className="col-md-6">
                                    <div className="info-main">
                                        <p key={i} className="h5 title">{product.prdtname} </p>
                                    </div>
                                    <div>
                                        <small key={i} className="text-muted">{product.descn}</small>
                                    </div>
                                    <div  key={i} className="price mt-1"> <p style={{fontSize: '24px', fontWeight: '500', display: 'inline'}}>₹ {product.price} </p>      
                                        <span  key={i} className="badge badge-danger" style={{marginLeft: '10px' , marginBottom:'15px'}}>{product.offer}% Off </span>
                                    </div>
                                </div> 
                                <aside className="col-md-3">
                                    <div className="info-aside">
                                        <div className="price-wrap">
                                            <span className="h5 price">Price<small className="text-muted">/per item</small></span>	
                                        </div>
                                        <small className="text" style={{color: "green"}}>Free delivery in 2-3 days</small>
                                        <div className="h6">brand</div>
                                        <div className="h6">catgy</div>
                                        <div className="mt-3">
                                            <button onClick={()=>RemoveWishlist(product.prdtid)} className="btn btn-outline-primary"> <i className="fa fa-trash"></i> Remove Item </button>
                                        </div>
                                    </div>
                                </aside> 
                            </div> 	
                            ))} 
                            </article>
                    </main>   
                </div>
                <hr />
					<div style={{textAlign: "center", marginTop: "5px" }}>
						<Link to="/listproducts">
							<img src="/images/banners/hp_default_sale_1192020.jpg " style={{justifyContent: "center"}} />	
						</Link>   
					</div>  
            </div> 
            
            )
        }else {
            return(
                <div style={{textAlign: "center", marginTop: "5px" }}>	
                     <img src="/images/Cards/empty_wishlist.png " style={{justifyContent: "center"}} />	  
                    <div>
                        <Link to="/" className="btn btn-light" style={{color:"#aa5279", backgroundColor:'#fdf6d8'}}> <i className="fa fa-chevron-left"></i> Continue shopping </Link>
                    </div> 
            </div> 	
            )
        }
        

    }

    useEffect(() => {
        loadWishlist()
        
    },[]);

    return (

        <section className="section-content padding-y">
            {showWishlist()}
        </section>
    )
    
}

export default Wishlist




