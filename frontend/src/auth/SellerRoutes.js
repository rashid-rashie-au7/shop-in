import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticate} from './index';

const SellerRoutes = ({component: Component,...rest}) =>(
    <Route
        {...rest}
        render = {props =>
            isAuthenticate() && isAuthenticate().user.usertype == 0 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname:"/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

export default SellerRoutes;