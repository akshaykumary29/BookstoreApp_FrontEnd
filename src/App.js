import logo from './logo.svg';
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

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <MainPage /> */}
      <Header />
      {/* <Router>
        <Switch>
          <Route path="/" component={MainPage}/>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
