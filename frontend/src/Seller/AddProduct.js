import React, {useState,useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticate} from '../auth';
import {createProduct} from './ApiSeller';
import {getCategories} from '../core/apiCore'
import axios from "axios"

const AddProduct =() =>{ 
    const [imgpath1,setimage1] = useState("")
    const [prdtname,setPrdtname] = useState("")
    const [descn,setdescn] = useState("")
    const [brand,setBrand] = useState("")
    const [catgy,setCatgy] = useState([])
    const [category,setCategory] = useState([])
    const [price,setPrice] = useState("")
    const [gstper,setgstPer] = useState("")
    const [qty,setQty] = useState("")
    const [offer,setOffer] = useState("")
    const [video,setVideo] = useState("")
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const [success,setSuccess] = useState(false)
    const [created,setCreated] = useState("")
    const [url,setUrl] = useState("")
    const [redirectToProfile,setredirectToProfile] = useState(false)
    const {user,token} = isAuthenticate();
    
    const addProduct =async()=>{
        const data = new FormData()
        data.append("file",imgpath1)
        data.append("upload_preset","shopin")
        data.append("cloud_name","deah2r0m5")
        const res = await axios.post("https://api.cloudinary.com/v1_1/deah2r0m5/image/upload", data);
        const url = res.data.secure_url;
        setUrl(url)
        setCatgy([])
        setLoading(true)
        setSuccess(true)
      
        createProduct(user.userid,token,{prdtname,descn,brand,price,gstper,offer,category,qty,video,url})
         .then(result => {
             if(result.error){
                setError(result.error)
                setSuccess(false)
             }else {
                 setLoading(false)
                setCreated(result.prdtname)
                setPrdtname("")
                setPrice("")
                setdescn("")
                setBrand("")
                setCatgy([])
                setgstPer("")
                setQty("")
                setOffer("")
                setVideo("")
                setUrl("")
            }
        })
    };
    const setProducts = ()=>{
        getCategories().then(cat => {
            
            if (cat.error) {
                setError( cat.error);
            } else {
                console.log(cat)
                setCatgy(cat);
            }
        });
    }
    useEffect(()=>{
        setProducts()
    },[])
    const addProductForm = () =>( 
            <div className="card mx-auto" style={{maxWidth:"520px", marginTop:"40px"}}>
                <article className="card-body">
                    <header className="mb-4"><h4 className="card-title">Create Product</h4></header>
                    <div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label style={{color:'black'}}>Product Name</label>
                                <input onChange={(e)=>setPrdtname(e.target.value)} type="text" name="prdtname" value={prdtname} className="form-control" style={{textTransform:"capitalize"}} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{color:'black'}}>Description</label>
                            <input onChange={(e)=>setdescn(e.target.value)}  type="text" name="descn"value={descn} className="form-control" style={{textTransform: "capitalize"}} />
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label style={{color:'black'}}>Price</label>
                                <input onChange={(e)=>setPrice(e.target.value)} type="number"name="price" value={price} className="form-control" />
                            </div>
                            <div className="col form-group">
                                <label style={{color:'black'}}>GST %</label>
                                <input onChange={(e)=>setgstPer(e.target.value)}  type="number" name="gstper" value={gstper} className="form-control" />
                            </div> 
                            <div className="col form-group">
                                <label style={{color:'black'}}>Offer %</label>
                                <input onChange={(e)=>setOffer(e.target.value)}  type="number" value={offer} name="offer"className="form-control" />
                            </div> 
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label style={{color:'black'}}>Category</label>
                            <select onChange={(e)=>setCategory(e.target.value)}  id="inputState" value={category} name ="catgy" className="form-control">                     
                            <option>Please select</option>
                            {catgy &&
                                    catgy.map((c, i) => (
                                <option key={i} >{c.catgy}
                                </option>
                            ))}
                            </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label style={{color:'black'}}>Qty</label>
                                <input onChange={(e)=>setQty(e.target.value)}  type="number"name ="qty" value={qty} className="form-control"/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label style={{color:'black'}}>Brand</label>
                                <input onChange={(e)=>setBrand(e.target.value)}  type="text" name="brand" value={brand} className="form-control" style={{textTransform: "capitalize"}} />
                            </div>
                        </div> 
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label style={{color:'black'}}>Image 1</label>
                                <input onChange={(e)=>setimage1(e.target.files[0])}  type="file"  name ="imgpath1"accept="image/*" />
                            </div> 
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label style={{color:'black'}}>Video Link</label>
                                <input onChange={(e)=>setVideo(e.target.value)} type="text" value={video} name="video" className="form-control" />
                            </div> 
                        </div>
                        <div className="form-group">
                            <button onClick={()=>addProduct()} className="btn btn-primary btn-block"> Add Product  </button>
                        </div>  
                    </div>
                </article>
            </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: created ? '' : 'none' }}>
            <h2>{`${created}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return(
        <Layout >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                     {showLoading()}
                     {showSuccess()}
                    {showError()}  
                    {addProductForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;





