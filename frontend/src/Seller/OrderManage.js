import React, {useState, useEffect, Fragment} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getOrders,postOrders} from '../actions/OrderListAction';  
import {isAuthenticate} from '../auth/index'
import{Link} from 'react-router-dom'

const OrderManage = () => {

    const dispatch = useDispatch();
    const{user,token} = isAuthenticate();
    const sellerid = user.userid;
    const orderList = useSelector(state =>state.reducerOrderList)
    if(orderList[0] !== undefined){
        orderList[0].map((ele)=>(
            console.log('statusss==',ele)
        ))
    }

const ClickEvent = (oid,prdt) => {
    // e.preventDefault()
    dispatch(postOrders(sellerid,oid,prdt,token))
}

const showOrderList = () =>{
    if(orderList[0] !== undefined){
        return( 
            <Fragment > 
                {orderList[0].map((ele,i)=>(
                <div className="col-xl-5 col-lg-5 col-md-5 col-6 mt-3">
                    <figure className="card card-product-grid">                   
                        <figcaption className="info-wrap">  
                            <div className="card-body">
                                <dl className="dlist-align h6">
                                <dt>OID : </dt>
                                <dd className="text-right h6">{ele.oid} </dd>
                                </dl>
                                <dl className=" dlist-align h6">
                                <dt style={{width:'50%'}}>Order Date & Time:</dt>
                                <dd className="text-right">{(new Date(ele.date)).toLocaleDateString('en-GB')},{(new Date(ele.date)).toLocaleTimeString('en-GB')}  </dd>
                                </dl>
                                <dl className="h6 dlist-align">
                                <dt>Trans ID : </dt>
                                <dd className="text-right"> {ele.transid} </dd>
                                </dl>
                                <br />
                                <dl className="h6">
                                <dt style={{textDecoration:'underline'}}>Item Purchased :</dt>
                                </dl>
                                <dl  >
                                <dd style={{overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}}>Name: {ele.prdtname}</dd>
                                <dd >Brand: {ele.brand}, Qty: {ele.qty}</dd>
                                <dd >Total: {(ele.total).toFixed(2)}</dd>
                                </dl>
                                <br/>
                                <dl className="h6">
                                <dt style={{textDecoration:'underline'}}>Shipping Details :</dt>
                                </dl>
                                <dl>
                                    <dd >{ele.buyername}</dd>
                                    <dd >{ele.addrs1},</dd>
                                    <dd>{ele.adrs2}</dd>
                                    <dd >Mob: {ele.mob}</dd>
                                </dl>
                                <hr/>
                                <div row sm-3>
                                    <button type="submit" onClick={()=> ClickEvent(ele.oid,ele.prdtname)} class="btn btn-primary btn-block"> Accept Order </button>
                                </div>   			
                            </div>
                        </figcaption>
                    </figure>
                </div>
                ))}
            </Fragment>
        )
    } else {
        return (
            <div style={{textAlign: "center", marginTop: "5px" }}> 
                <img src="/images/Cards/noprdt.png " style={{justifyContent: "center"}} />	  
                <div>
                    <Link to="/seller" className="btn btn-light" style={{color:"#aa5279", backgroundColor:'#fdf6d8'}}> <i className="fa fa-chevron-left"></i> Back To Home </Link>
                </div> 
            </div> 	
        )
    }  
}

useEffect(()=>{
    dispatch(getOrders(sellerid,token))   
},[])



    return(
        <div className="row" style={{paddingLeft:'10%'}}> 
            {showOrderList()}
        </div>

        
      
    )
};
export default OrderManage;