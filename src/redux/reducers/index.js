import { getBookItem } from "./Books";
import { getCartItem } from "./Carts";
import { combineReducers } from "redux";

export const bookstoreReducer = combineReducers({
    getBookItem,
    getCartItem
});

export default bookstoreReducer;