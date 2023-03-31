import React, { useState } from 'react'
import { Link,Outlet } from 'react-router-dom';
import './diseaseRoute.css'


function DiseaseRoutes() {
  
  const [display,setDisplay]=useState(false)

const handleSubmit=()=>
{
  setDisplay(!display)
}
    return (
        <>

        
       
<nav className="navbar navbar-expand-lg navbar-dark ">
  <div className="container-fluid">
    <ul className="navbar-nav nav-center">
    {!display &&  <li className="nav-item">
        <Link to="create" className="nav-link">
          <button onClick={()=>handleSubmit()}>Create Disease</button>
        </Link>
      </li>
      }
      { display && 
      <li className="nav-item">
        <Link to="edit" className="nav-link">
          <button  className="bg-danger"onClick={()=>handleSubmit()}>List</button>
        </Link>
      </li>
}
    </ul>
  </div>
</nav>

        <Outlet/>
       
        </>

    )
}

export default DiseaseRoutes


