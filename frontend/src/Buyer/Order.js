import React, {useState,useEffect, Fragment} from 'react'
import {getOrderList,createAndDownloadPdf} from './ApiBuyer';
import  {isAuthenticate} from '../auth/index'

const Order = () => {
    const {user,token} = isAuthenticate();
    const [orderDetails, setorderDetails] = useState([])
    const [orderitemDetails, setorderitemDetails] = useState([])
    const [error, setError] = useState([])

    const loadOrderDetails =() => {
        getOrderList(user.userid,token).then(data => {
            if(data.error){
                setError(data.error)
            } else{
                setorderDetails(data.order)
                setorderitemDetails(data.orderitem)
            }            
        })
    }

    useEffect(() => {
       loadOrderDetails()
        
    }, []);

    return (
        <section className="section-content padding-y">
        <div className="container">
            <div className="row">
                <main className="col-md-12">
                    <header className="section-heading heading-line">
                        <h4 className="title-section text-uppercase"><i className="fa fa-store"></i> My Orders</h4>
                    </header>   
                    <header className="mb-3">
                        <div className="form-inline">
                        <strong className="mr-md-auto"> {orderDetails.length} Items found. </strong>
                        </div>
                    </header>

                    {orderDetails.map((orders,i)=>(
                    <article className="card card-product-list"> 
                        <div className="row no-gutters">   
                            <div  className="col-md-9">
                                <div className="info-main">
                                    <div className="text-wrap ">
                                        <table  className="table table-borderless table-shopping-cart">
                                        <thead className="text-muted">
                                            <tr className="small text-uppercase">
                                            <th scope="col" className="text-left" width="70"></th>
                                                <th scope="col"width="250">PRDTNAME</th>
                                                <th scope="col" width="30">QTY</th>
                                                <th scope="col" width="100">DETAILS</th>
                                                <th scope="col" width="100">SELLER</th>
                                                <th scope="col" width="70">TOTAL</th>
                                                <th scope="col" width="70">STATUS</th>
                                            
                                            </tr>
                                        </thead>
                                        {orderitemDetails.map((o,j)=>(
                                        <tbody>
                                                {orders.oid == o.oid?
                                                <tr >
                                                    <td>
                                                        <div className="aside"><img src={o.imgpath1}  className="img-sm"/></div>
                                                    </td>
                                                    <td>
                                                        <a  className="title text-dark">{o.prdtname} </a>						
                                                    </td>
                                                    <td> 
                                                        <var className="text">{o.qty}</var>
                                                    </td>
                                                    <td> 
                                                        <div className="price-wrap"> 
                                                            <var className="text-muted">Category: {o.catgy}</var> 
                                                            <small className="text-muted">Brand :{o.brand}</small> 
                                                        </div>
                                                    </td>
                                                    <td> 
                                                        <var className="price"> {o.seller} </var>
                                                    </td>
                                                    <td> 
                                                        <div className="price-wrap"> 
                                                            <var className="price">₹{(o.total).toFixed(2)}</var>  
                                                        </div> 
                                                    </td>
                                                    <td> 
                                                        <var className="text-muted">{o.status} </var>
                                                    </td>
                                                   
                                                </tr>
                                               	 :<Fragment/>}
                                            </tbody>
                                            ))}
			                            </table>
                                    </div>
                                    </div>
                            </div> 
                           
                            <aside  className="col-md-3">
                            {/* {i==j? */}
                            <div className="card">
                                <div className="card-body">
                                <dl className="dlist-align">
                                    <dt>OrderID:</dt>
                                    <dd className="text-right">{orders.oid}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                    <dt>TransID:</dt>
                                    <dd className="text-right">{orders.transid}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                    <dt >Date:</dt>
                                    <dd className="text-right">{(orders.date)}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                    <dt>Total price:</dt>
                                    <dd className="text-right">₹ {orders.subtotal}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                    <dt>Discount:</dt>
                                    <dd className="text-right">₹ {orders.disc}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                    <dt>Extra Discount:</dt>
                                    <dd className="text-right">₹ {orders.extradisc}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                    <dt>Tax Amount:</dt>
                                    <dd className="text-right">₹{orders.tax}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                    <dt>Shipping Charge:</dt>
                                    <dd className="text-right">₹{orders.shipping}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                    <dt>Total:</dt>
                                    <dd className="text-right  h5"><strong>₹ {orders.total}</strong></dd>
                                    </dl>
                                    <dl>
                                  	    <button  onClick={()=> {createAndDownloadPdf(orders.oid)}} className="btn  btn-outline-primary float-md-right"><i className="fa fa-download mr-2"></i>Invoice</button>			
                                    </dl>
                                </div>
                               
                            </div>
                        </aside>
                         
                        </div>  
                   </article>
                    ))}

                </main> 
            </div>
                <div style={{textAlign: 'center' , marginTop: '25px', marginBottom: '25px'}} >
                    <img src="images/emptyicons/emptyorder.png" style={{justifyContent:'center'}} />	   
                </div> 
        </div> 
    </section>
)

}

export default Order




