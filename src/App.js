import './App.css';
import Header from './header';
// import { Route, Redirect, Switch } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import MyProperties from "./myProperties";
import IndividualProperty from "./individualProperty";
import LoginScreen from "./login";
import Home from "./home";
import StatusScreen from "./status";

function App() {
  return (
    <div className="App">
      <Header/>
       <div className="container" style={{ marginTop:'150px' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/myProperties" element={<MyProperties />} />
          <Route  path="/myProperties/:propertyName" element={<IndividualProperty />} />
          <Route  path="/login/:userType" element={<LoginScreen />} />
          <Route  path="/myProperties/:propertyName/status" element={<StatusScreen />} />
        </Routes>
        </div>
    </div>
  );
}
export default App;