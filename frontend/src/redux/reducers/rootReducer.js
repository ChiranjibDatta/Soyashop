
import {productListReducer, productDetailsReducer} from "./productReducers"
import {cartReducer} from './cartReducer'
import {userLoginReducer, userRegisterReducer} from "./userReducers";
const rootReducer = {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
};
export default rootReducer