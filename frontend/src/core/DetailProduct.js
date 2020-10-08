import React, {useState,useEffect} from 'react';
import '../style.css';
import {getPrdtData,similiarProducts} from './apiCore'
import Card from './Card'
import  {isAuthenticate} from '../auth/index'
import {addCart,addWishlist} from '../Buyer/ApiCart'
import {Redirect,useHistory } from 'react-router-dom'

const DetailProduct = (props) =>{

    const [product,setProduct] = useState({})
    const [similiar,setSimiliar] = useState([])
    const [error,setError] = useState(false)
    const {user,token} = isAuthenticate()
    const [redirectCart, setRedirect] = useState(false);
    const [success, setSuccess] = useState(false);
    const [msg,setMsg]= useState(false);
    const history = useHistory()
    
    const loadProduct = prdtid => {
        getPrdtData(prdtid).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                similiarProducts(data.prdtid).then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setSimiliar(data)
                    }
                })
            }      
        })
    }

    const addToCart =()=>{
        if(!user ){
            setError("Please Login/Register to Continue")
        }else {
        addCart(user.userid,product.prdtid,token).then (data =>{
            if (data.error){
                setError(data.error)
                setMsg(data.error)
            }else {
                setRedirect(true)
            }
        })   
    }      
    }
    
    const addToWishlist=()=>{
        if(!user){ setError("Please Login/Register to Continue")}
        else {
        addWishlist(user.userid,product.prdtid,token).then (data =>{
            console.log('datttaa',data)
            if (data.error){
                console.log("hereeeee")
                setError(data.error)
                setMsg(data.error)
            }else {
                setMsg(data.message)
                setSuccess(true)
            }
        })
    }         
    }

    const checkStock = qty => {
        return qty > 0 ? (
            qty > 5 ?(<dd className="col-sm-9" style ={{color:"Green", fontSize:'18px', fontWeight:'200px'}}>In Stock</dd> 
            ) : ( <dd className="col-sm-9 " style ={{color:"#ff4757",fontSize:'18px', fontWeight:'200px'}}>Hurry Up!...Limited Stocks</dd>)
            ) : ( <dd className="col-sm-9 " style ={{color:"#eb3b5a",fontSize:'18px', fontWeight:'200px'}}>Out of Stock</dd> );
    };

    const checkCartBtn = qty => {
        return qty > 0 ? ( <button onClick={addToCart} className="btn  btn-primary mr-2"> 
                    <i className="fas fa-shopping-cart"></i> <span className="text">Add to cart</span> 
                     </button> 
            ) : ( <button onClick={addToCart} className="btn  btn-primary mr-2" disabled> 
                    <i className="fas fa-shopping-cart"></i> <span className="text">Add to cart</span> 
                </button> );
    };
    const redirectToCart = () => {
        if (redirectCart) {
            if (!error) {
                return <Redirect to="/mycart" />;
            }  
        }
    };
    const showSuccess= () => (
        <div className = "alert alert-success" style={{display:success? '' : 'none'}}>
            {msg}
        </div>
    )
    const showErr= () => (
        <div className = "alert alert-danger" style={{display: error? '' : 'none'}}>
           {error}
        </div>
    )

    useEffect(()=> {
        const prdtid = props.match.params.prdtid
        loadProduct(prdtid)
    },[props])
    return(

        <div>
            <section className="section-content bg-white padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-md-6">
                            <div className="card">
                                <article className="gallery-wrap"> 
                                    <div className="img-big-wrap"> <img src={product.imgpath1} />
                                        {/* <div> <video autoPlay playsInline muted src={"https://www.youtube.com/watch?v=DWRcNpR6Kdc"} /> */}
                                        {/* <div className="big-img">
                                            <img src={item.src[index]} alt=""/>
                                        </div>     */}
                                            
                                    </div> 
                                    <div className="thumbs-wrap">
                                        <a href="#" className="item-thumb"> <img src="/images/items/4.jpg"/></a>
                                        <a href="#" className="item-thumb"> <img src="/images/items/9.jpg"/></a>  
                                        <a href="#" className="item-thumb"> <img src="/images/items/15-1.jpg"/></a>      
                                    </div> 
                                </article> 
                            </div>
                        </aside>
                        <main className="col-md-6">
                            <article className="product-info-aside">
                                <h2 className="title mt-3">{product.prdtname} </h2>
                                <div className="mb-3"> 
                                     <var className="price h4">₹ {(product.price-(product.price*product.offer/100)).toFixed(2)}</var> 
                                     <span className="text-muted"> Incl.GST</span> 
                                    <p> <span className="text-muted" > ₹ {product.price}  </span> <span className="badge badge-danger" style={{marginLeft: '10px'}}> {product.offer}  % Off </span> </p>  
                                </div> 
                                <p> {product.descn} </p>
                                <dl className="row">
                                <dt className="col-sm-3">Category :</dt>
                                <dd className="col-sm-9">{product.catgy}</dd>
                                <dt className="col-sm-3">Product ID :</dt>
                                <dd className="col-sm-9">{product.prdtid}</dd>
                                <dt className="col-sm-3">Delivery time :</dt>
                                <dd className="col-sm-9">3-4 days</dd>
    
                                <dt className="col-sm-3">Availabilty :</dt>
                                {checkStock(product.qty)}
                                </dl>
                                <div className="form-row  mt-4"> 
                                    <div className="form-group col-md">
                                        {checkCartBtn(product.qty)}
                                        {redirectToCart()}
                                        <button  onClick={addToWishlist} className="btn btn-outline">
                                            <i className="fas fa-heart"></i> <span className="text">Add to Wishlist</span> 
                                        </button>
                                       
                                    </div>
                                    {showErr()}
                                     {showSuccess()}
                                </div> 
                            </article> 
                        </main> 
                    </div> 
                </div>
            </section>
            <div>
                <h2>Similiar Products</h2>
                <div className='row'> 
                    {similiar.map((pdt,i)=>(
                    <Card key={i}  product={pdt} />
                    ))}
                </div>
            </div>
        </div>    
    )
}

export default DetailProduct