import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import App from './components/App.jsx'

import Reducers from './reducers/index'

const store = createStore(Reducers, {}, applyMiddleware())

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

console.log('STRIPE KEY IS:', process.env.REACT_APP_STRIPE_KEY);
console.log('ENV', process.env.NODE_ENV)