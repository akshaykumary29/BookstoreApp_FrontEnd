
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import MainPage from './pages/mainPage/MainPage';
import Home from './pages/home/Home';
import DisplayBook from './components/displayBook/DisplayBook';
import DisplayCart from './components/displayCart/DisplayCart';
import Wishlist from './components/wishlist/Wishlist';
import CheckoutOrder from './components/checkout/CheckoutOrder';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Switch> */}
        <Route path="/" component={MainPage} exact />
        <Route path="/home" component={Home} />
        <Route path="/cart" component={DisplayCart} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/checkout" component={CheckoutOrder} />
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
