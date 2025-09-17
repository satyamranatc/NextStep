import React,{useState,useEffect} from 'react'


import NavBar from "./components/NavBar.jsx"
import Auth from "./components/Auth.jsx"
import Profile from "./components/Profile.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"


import Home from "./pages/Home.jsx"
import Guide from "./pages/Guide.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom"


export default function App() {

  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [userData, setUserData] = useState({});

  useEffect(()=>{
    let user = localStorage.getItem("userData");
    if(user){
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  },[])


  return (
    <div>
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} userData={userData}  />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/guide" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Guide userData = {userData} />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile userData={userData} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
            </PrivateRoute>
          } />
          <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
          <Route path="/*" element={<h1>Not Found!</h1> }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
