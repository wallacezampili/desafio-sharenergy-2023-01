import "./App.css";
import Navbar from "./Components/Layout/Navbar/navbar";
import Cat from "./Components/Pages/HttpCat/Cat";
import Dog from "./Components/Pages/RandomDog/Dog";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RandomUsers from "./Components/Pages/RandomUsers/randomusers";
import Clients from "./Components/Pages/ClientsCrud/clients";
import EditClient from "./Components/Pages/EditClient/editClient";
import Login from "./Components/Pages/Login/login";
import { AuthProvider, AuthContext } from "./Contexts/AuthContext";
import React, {useContext} from "react";

function App() {

  function Private(props : {children: JSX.Element}):JSX.Element
  {
    const context = useContext(AuthContext);
    
    if(context?.authloading)
    {
      return <div>Carregando</div>;
    }

    if(!context?.authenticated)
    {
      return <Navigate  to='/login'/>
    }

    return props.children;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
      <Navbar />
      <Routes>
        
        <Route path="/cats" element={<Private><Cat /></Private>} />
        
        <Route path="/dogs" element={<Private><Dog /></Private>} />
        
        <Route path="/clients" element={<Private><Clients /></Private>} />
        
        <Route path="/clients/:id" element={<Private><EditClient /></Private>} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Private><RandomUsers /></Private>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
