import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 


ReactDOM.render(<Provider store={store}>
  <Routes />
</Provider>, document.getElementById('root'));