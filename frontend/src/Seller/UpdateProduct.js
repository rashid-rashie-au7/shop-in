import React, {useState,useEffect} from 'react';
import {isAuthenticate} from '../auth';
import {Redirect} from 'react-router-dom';
import { getSingleProduct,updateProduct,deleteProduct} from './ApiSeller';
import {getCategories} from '../core/apiCore'

const UpdateProduct =(props) =>{

    const [values,setValues] = useState({
        prdtname:'',
        descn:'',
        brand: '',
        categories:[],
        catgy:'',
        price:'',
        gstper:'',
        qty: '',
        offer: '',
        video:'',
        loading:false,
        error:'',
        created:'',
        redirectToProfile: false   
    })
    const [categories, setCategories] = useState([]);
    
    const {user,token} = isAuthenticate();
    const {
        prdtname,
        descn,brand,catgy,price,gstper,
        qty,offer,video,
        loading,error,created,
        redirectToProfile 
    } = values;

    const loadProduct = productId => {
        getSingleProduct(productId,user.userid,token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                console.log(data,"single")
                setValues({
                    ...values,
                    prdtname: data.prdtname,
                    descn: data.descn,
                    brand:data.brand,
                    catgy:data.catgy,
                    price:data.price,
                    gstper:data.gstper,
                    qty:data.qty,
                    offer:data.offer,
                    video:data.video,
                });
               
                LoadCategories();
            }
        });
    };

    const LoadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        const prdtid = props.match.params.prdtid
        loadProduct(prdtid);
    }, []);

    const handleChange = prdtname => event =>{
        const value = event.target.value
        // formData.set(prdtname,value)
        setValues({...values,[prdtname]: event.target.value });
    };

    const clickSubmit = (event) => {
        const prdtid = props.match.params.prdtid
        event.preventDefault();
        setValues({...values, error:'', loading:true});
        updateProduct(prdtid,user.userid,token,{prdtname,descn,brand,price,gstper,offer,catgy,qty,video})
        .then(data => {
            if(data.error){
                setValues({...values,error:data.error});
            }else {
                console.log(data)
                setValues({
                    ...values,
                    prdtname:'',
                    descn:'',
                    brand: '',
                    catgy:'',
                    price:'',
                    gstper:'',
                    qty: '',
                    offer: '',
                    video:'',
                    loading:false,
                    redirectToProfile: true,
                    created:data.prdtname       
                });
            }
        });
    };

    const clickDelete = (event) => {
        const prdtid = props.match.params.prdtid
        event.preventDefault();
        setValues({...values, error:'', loading:true});
        deleteProduct (prdtid, user.userid, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
            setValues({
                redirectToProfile:true
            })
            }
        });
       

    };

 
    const addProductForm = () =>( 
            <div className="card mx-auto" style={{maxWidth:"520px", marginTop:"40px"}}>
                <article className="card-body">
                    <header className="mb-4"><h4 className="card-title">Create Product</h4></header>
                    <form >
                        <div className="form-row">
                            <div className="col form-group">
                                <label>Product Name</label>
                                <input onChange={handleChange('prdtname')} type="text" name="prdtname" value={prdtname} className="form-control" style={{textTransform:"capitalize"}} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input onChange={handleChange('descn')} type="text" name="descn"value={descn} className="form-control" style={{textTransform: "capitalize"}} />
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label>Price</label>
                                <input  onChange={handleChange('price')}type="number"name="price" value={price} className="form-control" />
                            </div>
                            <div className="col form-group">
                                <label>GST %</label>
                                <input onChange={handleChange('gstper')} type="number" name="gstper" value={gstper} className="form-control" />
                            </div> 
                            <div className="col form-group">
                                <label>Offer %</label>
                                <input onChange={handleChange('offer')} type="number" value={offer} name="offer"className="form-control"onchange="handleChange(this);" />
                            </div> 
                            
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label>Category</label>
                            <select onChange={handleChange('catgy')} id="inputState" name ="catgy" value={catgy} className="form-control">
                                <option selected=""> Choose...</option>
                                {categories &&
                                    categories.map((c, i) => (
                                        <option key={i} value={c.catgy}>
                                            {c.catgy}
                                        </option>
                                    ))}
                            </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Qty</label>
                                <input onChange={handleChange('qty')} type="number"name ="qty" value={qty} className="form-control"/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label>Brand</label>
                                <input onChange={handleChange('brand')} type="text" name="brand" value={brand} className="form-control" style={{textTransform: "capitalize"}} />
                            </div>
                        </div> 
                        <div className="form-row">
                            <div className="col form-group">
                                <label>Video Link</label>
                                <input onChange={handleChange('video')} type="text" value={video} name="video" className="form-control" />
                            </div> 
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group col md-6">
                                <button className="btn btn-primary btn-block" onClick={clickSubmit}> Update  </button>
                            </div> 
                            <div className="form-group col md-6">
                                <button className="btn btn-primary btn-block" onClick={clickDelete}> Delete </button>
                            </div>  
                        </div>
                    </form>
                </article>
            </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: created? '' : 'none' }}>
            <h2>{`${created}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/seller" />;
            }
        }
    };

    return(   
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {addProductForm()}
                    {redirectUser()}
                </div>
            </div>
    );
};

export default UpdateProduct;




