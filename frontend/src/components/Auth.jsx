import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function Auth({setIsLoggedIn, setUserData}) {

  useEffect(()=>{
    let user = localStorage.getItem("userData");
    if(user){
     navigate("/profile");
    }
  },[])

  let navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault();

        let Data = {
            email: e.target[0].value,
            password: e.target[1].value,
        };

        let res = await axios.post("http://localhost:5500/api/auth/login", Data);

          if(res.status == 201)
          {
            console.log(res.data);
              localStorage.setItem("userData", JSON.stringify(res.data));
              setIsLoggedIn(true);
              setUserData(res.data);
              navigate("/profile");
          }
        else
        {
          console.log(res);
        }
            
       
        
    }
 async function handleSignUp(e) {
        e.preventDefault();

        let Data = {
            fullName: e.target[0].value,
            avatar: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        };
        console.log(Data);

        let res = await axios.post("http://localhost:5500/api/auth/register", Data);
       
        if(res.status == 201)
        {
          console.log(res.data);
            localStorage.setItem("userData", JSON.stringify(res.data));
            setIsLoggedIn(true);
            setUserData(res.data);
            navigate("/profile");
        }
        else
        {
          console.log(res);
        }
            
       
        
    }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <Tabs>
          {/* Tab Header */}
          <TabList className="flex justify-center gap-4 mb-6">
            <Tab className="px-6 py-2 rounded-3xl bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600 focus:outline-none">
              Sign In
            </Tab>
            <Tab className="px-6 py-2 rounded-3xl bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600 focus:outline-none">
              Sign Up
            </Tab>
          </TabList>

          {/* Sign In Form */}
          <TabPanel>
            <form className="flex flex-col gap-4" onSubmit={handleLogin} >
              <input
                className="border border-gray-300 px-4 py-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                placeholder="Email"
              />
              <input
                className="border border-gray-300 px-4 py-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="password"
                placeholder="Password"
              />
              <button className="mt-2 bg-indigo-500 text-white rounded-3xl px-6 py-3 hover:bg-indigo-600 active:bg-indigo-700 transition">
                Sign In
              </button>
            </form>
          </TabPanel>

          {/* Sign Up Form */}
          <TabPanel>
            <form className="flex flex-col gap-4" onSubmit={handleSignUp} >
              <input
                className="border border-gray-300 px-4 py-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                placeholder="Name"
              />
              <input
                className="border border-gray-300 px-4 py-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                placeholder="Avatar"
              />
              <input
                className="border border-gray-300 px-4 py-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                placeholder="Email"
              />
              <input
                className="border border-gray-300 px-4 py-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="password"
                placeholder="Password"
              />
              <button className="mt-2 bg-indigo-500 text-white rounded-3xl px-6 py-3 hover:bg-indigo-600 active:bg-indigo-700 transition">
                Sign Up
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
