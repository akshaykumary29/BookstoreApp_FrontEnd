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

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Signup /> */}
      <MainPage />
      <Router>
        <Switch>
          <Route path="/" component={MainPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
