import React, {useEffect,useState} from 'react';
import {getSellerProfile,updateSeller} from './ApiSeller'
import  {isAuthenticate} from '../auth/index'
import {Link,Redirect} from 'react-router-dom'

const SellerProfile  = ({match}) => {

    const [values, setValues] = useState({
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		shop: '',
		gstin: '',
		street: '',
		city: '',
		state: '',
		pin: '',
		po: '',
        others: ''
    });
   
    const {user,token} = isAuthenticate()
    const {firstname,lastname,email,phone,shop,gstin,street,city,state,pin,po}= values
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
    const [redirectToHome,setRedirect]=useState(false)
    
    const loadProfile =() => {
        getSellerProfile(user.userid,token).then(data => {
            if(data.error){
                setError(data.error)
            } else{
                console.log('Dataa set ', data)
                setValues({ ...values, firstname: data.firstname ,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                shop: data.shop,
                gstin: data.gstin,
                street: data.street,
                city: data.city,
                state: data.state,
                pin: data.pin,
                po: data.po,
                 });
            }            
        })
    }

    useEffect(() => {
        loadProfile()
    },[]);

    const handleChange = firstname => e => {
        setValues({ ...values, error: false, [firstname]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        updateSeller(user.userid, token,{firstname,lastname,email,phone,shop,gstin,street,city,state,pin,po})
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                    setValues({
                        ...values,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        phone: data.phone,
                        shop: data.shop,
                        gstin: data.gstin,
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        pin: data.pin,
                        po: data.po
                    });
                setSuccess(true);
                setRedirect(true)
            }
        });
    };
 
    const profileUpdate = (firstname,lastname,email,phone,shop,gstin,street,city,state,pin,po) =>{
        return(
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <main className="col-md-10" >
                        <header className="section-heading heading-line">
                            <h4 className="title-section text-uppercase"><i className="fa fa-user-circle"></i>  My Profile</h4>
                        </header>
                        <header className="mb-3">
                            <div className="form-inline">
                                <strong className="mr-md-auto">Basic Info </strong>
                            </div>
                        </header>
                        <form >
                            
                        <article className="card mx-auto" style={{padding:'50px 80px 50px 80px'}}>
                                <div className="form-row" >
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>First Name</label>
                                            <input type="text" className="form-control" onChange={handleChange('firstname')} value = {firstname} disabled />
                                        </div>		
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>Last Name</label>
                                            <input type="text" className="form-control"onChange={handleChange('lastname')} value = {lastname} />
                                        </div> 
                                </div>
        
                                <div className="form-row">
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>Email</label>
                                            <input type="text" className="form-control" onChange={handleChange('email')} value = {email} disabled />
                                        </div>		
                                        <div className="col form-group">
                                        <label style={{color:'black'}}>phone</label>
                                        <input type="text" className="form-control" onChange={handleChange('phone')} value = {phone} />
                                        </div> 
                                </div>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label style={{color:'black'}}>Shop Name</label>
                                        <input type="text" className="form-control" onChange={handleChange('shop')} value = {shop}/>
                                    </div>		
                                    <div className="col form-group">
                                        <label style={{color:'black'}}>GSTIN</label>
                                        <input type="text" className="form-control" onChange={handleChange('gstin')} value = {gstin}/>
                                    </div> 
                                </div>
                                <div className="form-row">
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>Street</label>
                                            <input type="text" className="form-control" onChange={handleChange('street')} value = {street} />
                                        </div>		
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>City</label>
                                            <input type="text" className="form-control" onChange={handleChange('city')} value = {city} />
                                        </div> 
                                </div>
                                <div className="form-row">
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>Post Box</label>
                                            <input type="text" className="form-control" onChange={handleChange('po')} value = {po} />
                                        </div>		
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>PB Number</label>
                                            <input type="text" className="form-control" onChange={handleChange('pin')} value = {pin} />
                                        </div> 		
                                </div>
        
                                <div className="form-row">
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>State</label>
                                            <select id="inputState" name ="cat" class="form-control" onChange={handleChange('state')} value = {state}>
                                                <option selected=""> Choose...</option>
                                                <option>Andra Pradesh</option>
                                                <option>Chattisgarh</option>
                                                <option>Goa</option>
                                                <option>Karnataka</option>
                                                <option>Kerala</option>
                                                <option>Tamil Nadu</option>
                                                <option>Telngana</option>
                                                <option>Others</option>
        
                                            </select>
                                        </div>		
                                        <div className="col form-group">
                                            <label style={{color:'black'}}>Others</label>
                                            <input type="text" className="form-control"  />
                                        </div> 		
                                </div>
                                <div className="form-row" style={{paddingLeft: '85%'}} >
                                    <button onClick={clickSubmit} className="btn btn-primary"  >Update Profile</button> 
                                </div>	
                        </article>
                    </form>
                    </main> 
                </div>
            </div> 
        </section>
        )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success? '' : 'none' }}>
            <h2> Your Profile is updated!</h2>
        </div>
    );

    const redirectUser = () => {
        if (redirectToHome) {
            if (!error) {
                return <Redirect to="/seller" />;
            }
        }
    };
    return(
        <div>
            {showError()}
            {showSuccess()}
            {redirectUser()}       
       {profileUpdate(firstname,lastname,email,phone,shop,gstin,street,city,state,pin,po)}
        </div>

    )
}

export default SellerProfile