import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from './components/Sidebar';
import LandingPage from './pages/LandinPage';
import axios from 'axios';
import Loading from './components/Loading';

function App() {

  // const [user, setUser] = useState();
  // const [loading, setLoading] = useState(false);
    
  // useEffect( ()=> {
  //     (async () => {
  //       setLoading(true);
  //       try{
  //         const response = await axios.get('http://localhost:4000/api/election/getUser',{
  //           withCredentials: true,
  //         });
  //         setUser(response.data.user);
  //       }
  //       catch(err){

  //       }
        
  //     })()
  //     setLoading(false);
  //   }, [setUser])

  // const notify = (message, status) => {

  //       switch(status){
  //         case 'error': 
  //         toast.error(message,{
  //           autoClose:3000,
  //           position: toast.POSITION.BOTTOM_RIGHT,
  //         })
  //         break;

  //         case 'success':
  //         toast.success(message, {
  //           autoClose:3000,
  //           position: toast.POSITION.BOTTOM_RIGHT
  //         });
  //         break;


  //       };
  //     }   
      
  return (
    <BrowserRouter>
    
     <SideBar />
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<p>Register user</p>}/>
        <Route path='/election' element={<p>Election page</p>}/>
        <Route path='/results' element={<p>All results</p>}/>
        <Route path='/results/:id' element={<p>Single result</p>}/>
        <Route path='/users' element={<p>All users</p>}/>
        <Route path='/users/:id' element={<p>Edit USer</p>}/>
        <Route path='/addElection' element={<p>Add election name and description</p>}/>
        <Route path='/addCandidate' element={<p>Add Candidate to election</p>}/>
        <Route path='/*' element={<p>Wrong page</p>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
