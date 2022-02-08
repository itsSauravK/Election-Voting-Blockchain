import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from './components/Sidebar';
import LandingPage from './pages/LandinPage';
import axios from 'axios';
import Loading from './components/Loading';
import Election from './pages/Election';
import AddElection from './pages/AddElection';
import AddCandidate from './pages/AddCandidate';
import web3 from 'web3';
import AuthContext from './store/auth-context';

function App() {
      
  return (
    <BrowserRouter>
    
     <SideBar />
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<p>Register user</p>}/>
        <Route path='/election' element={<Election />}/>
        <Route path='/results' element={<p>All results</p>}/>
        <Route path='/results/:id' element={<p>Single result</p>}/>
        <Route path='/users' element={<p>All users</p>}/>
        <Route path='/users/:id' element={<p>Edit USer</p>}/>
        <Route path='/addElection' element={<AddElection />}/>
        <Route path='/addCandidate' element={<AddCandidate />}/>
        <Route path='/*' element={<p>Wrong page</p>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
