import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

const reducer = combineReducers(rootReducer)
const middlleware = [thunk]

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        userLogin: {userInfo: userInfoFromStorage}

    }
}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlleware)))

export default store

