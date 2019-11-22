
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware }  from 'redux';
import 'materialize-css/dist/css/materialize.min.css'
import reduxThunk from 'redux-thunk';

import App from './components/App';

import Reducers from './reducers/index';

const store = createStore(Reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root')
);

console.log('STRIPE KEY IS:', process.env.REACT_APP_STRIPE_KEY);
console.log('ENV', process.env.NODE_ENV)