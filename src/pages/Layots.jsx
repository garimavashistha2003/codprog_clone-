import React from 'react'
import Nav from "../Components/Nav.jsx"
import {Outlet} from "react-router-dom"

function Layots() {
  return (
    <>
    <Nav/>
    <main>
      <Outlet/>
    </main>
    
    </>
  )
}

export default Layots