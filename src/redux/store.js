import { applyMiddleware, createStore } from "redux";
import { bookstoreReducer } from "./reducers/index";


const store = createStore(bookstoreReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;