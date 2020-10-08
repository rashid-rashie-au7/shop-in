import React,{useState} from 'react';
import Layout from '../core/Layout';
import {signin,authenticate,isAuthenticate } from '../auth'
import { Redirect} from 'react-router-dom';
           
const Signin = () => {

    const [values,setValues] = useState({
        email: 'rashie2012@gmail.com',
        password: 'Asd@123',
        error: '',
        loading: false,
        redirectToReferrer:false 
    });

    const {email,password,loading,error,redirectToReferrer} = values
    const {user} = isAuthenticate();
    const handleChange = email => event =>{
        setValues({...values,error:false,[email]: event.target.value });
    };

    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({...values, error: false, loading:true})
        signin({email,password})
        .then(data => {
            if(data.error){
                setValues({...values,error:data.error, loading:false})
            }else {
               authenticate(data, () => {
                setValues({
                    ...values,
                
                    redirectToReferrer: true 
                });
               }); 
            }
        })
    }

    const signInForm = () => ( 
        <div class="card mx-auto" >
            <article class="card-body">
                <header class="mb-4"><h4 class="card-title">SignIn</h4></header>
                <form> 
                    <div>
                        <label>Email</label>
                        <input onChange={handleChange('email')} type="email" name="email" class="form-control" value={email}></input>
                    </div>
                    <br>
                    </br>
                    <div class="form-row">
                        <div class="col form-group ">
                            <label>Password</label>
                            <input onChange={handleChange('password')} class="form-control" name ="password" type="password" value={password} />
                        </div>
                    </div>
                    <div class="form-group">
                        <button onClick={clickSubmit} type="submit" class="btn btn-primary btn-block"> Login  </button>
                    </div>  
                </form>
            </article>
        </div> 
    );
    const showErr= () => (
        <div className = "alert alert-danger" style={{display: error? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading= () =>(
        loading && <div className = "alert alert-info" >
            <h2>
                loading...
            </h2>
        </div>
    );

    const redirectUser = () => {
        if(redirectToReferrer){
           if(user && user.usertype === 0){
                return <Redirect to="/seller" />
           }else if(user && user.usertype === 1){
                return <Redirect to="/dashboard" />
           }

        }
    }

    return (
        <Layout
        className="container col-md-6 offset-md-3"
        >
            {showErr()}
            {showLoading()}
            {signInForm()}
            {redirectUser()}

        </Layout>
    );   
};

export default Signin;