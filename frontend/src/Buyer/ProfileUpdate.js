import React, {useEffect,useState} from 'react';
import {getBuyerProfile,updateBuyer} from './ApiBuyer'
import  {isAuthenticate} from '../auth/index'
import {Redirect} from 'react-router-dom'

const ProfileUpdate  = ({match}) => {

    const [values, setValues] = useState({
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		gender: '',
		home: '',
		street: '',
		city: '',
		state: '',
		pin: '',
		po: '',
        others: ''
    });
   
    const {user,token} = isAuthenticate()
    const {firstname,lastname,email,phone,gender,home,street,city,state,pin,po}= values
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
    const [redirectToHome,setRedirect]=useState(false)

    const loadProfile =() => {
        getBuyerProfile(user.userid,token).then(data => {  
            if(data.error){
                setError(data.error)
            } else{
                console.log('Dataa set ', data)
                setValues({ ...values, firstname: data.firstname ,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                home: data.home,
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
        updateBuyer(user.userid, token,{firstname,lastname,email,phone,gender,home,street,city,state,pin,po})
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                console.log(data)
                // updateUser(data, () => {
                    setValues({
                        ...values,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        phone: data.phone,
                        gender: data.gender,
                        home: data.home,
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        pin: data.pin,
                        po: data.po
                    });
                    setSuccess(true);
                    setRedirect(true);
                // });
            }
        });
    };
 
    const buyerUpdate = (firstname,lastname,email,phone,gender,home,street,city,state,pin,po) => (
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
                                    <label style={{color:'black'}}>Gender</label>
                                    <select id="inputState" name ="cat" class="form-control" onChange={handleChange('gender')} value = {gender} >
                                        <option selected=""> Choose...</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>		
                                <div className="col form-group">
                                    <label style={{color:'black'}}>Home</label>
                                    <input type="text" className="form-control" onChange={handleChange('home')} value = {home}  />
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
                return <Redirect to="/" />;
            }
        }
    };

    return(
        <div>
            {showError()}
            {showSuccess()}
            {redirectUser()}
       {buyerUpdate(firstname,lastname,email,phone,gender,home,street,city,state,pin,po)}
        </div>

    )
}

export default ProfileUpdate