import './App.css';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import GlobalStateViewer from "./components/GlobalStateViewer.js";

const App = () => {
  return (
    <Router>
      <>
        <div className="main-container">
          <GlobalStateViewer />

          {/* <Navbar /> */}
          <Switch>
            <Route path="/" exact={true} element={<Login />} />
            <Route path="/dashboard" exact={true} element={<Dashboard />} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </>
    </Router>
  );
};


export default App;
