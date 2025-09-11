import React from 'react'
import NavBar from "../components/NavBar.jsx"
import Home from "./pages/Home.jsx"
import Guide from "./pages/Guide.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {


  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
