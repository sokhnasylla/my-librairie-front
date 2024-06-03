import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import SignInSide from './Components/Pages/Auth/SignIn';
import Home from './Components/Pages/HomePublic';
import ListUser from './Components/Pages/DashbordAdmin/User/ListUser';
import Dashboard from './Components/Pages/DashbordAdmin/Dashboard/Dashboard';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSide/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/listUser" element={<ListUser/>}/>
            
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
