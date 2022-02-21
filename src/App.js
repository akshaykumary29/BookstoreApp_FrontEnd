
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import MainPage from './pages/mainPage/MainPage';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import DisplayBook from './components/displayBook/DisplayBook';
import DisplayCart from './components/displayCart/DisplayCart';
import Wishlist from './components/wishlist/Wishlist';
import CheckoutOrder from './components/checkout/CheckoutOrder';

function App() {
  return (
    <div className="App">
      {/* <MainPage /> */}
      {/* <DisplayBook /> */}
      {/* <Home /> */}
      {/* <DisplayCart /> */}
      {/* <Wishlist /> */}
      {/* <CheckoutOrder /> */}
      <Router>
        {/* <Switch> */}
          <Route path="/" component={MainPage} exact />
          <Route path="/home" component={Home}/>
          <Route path="/cart" component={DisplayCart} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/checkout" component={CheckoutOrder} />
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
