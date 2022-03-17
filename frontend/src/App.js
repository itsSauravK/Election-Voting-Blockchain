/**
 * @prettier
 */
import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from './components/Sidebar';
import LandingPage from './pages/LandingPage/LandinPage';
import Election from './pages/Election/Election';
import AddElection from './pages/AddElection/AddElection';
import AddCandidate from './pages/AddCandidate/AddCandidate';
import AllResults from './pages/AllResults/AllResults';
import SingleResult from './pages/SingleResult/SingleResult';
import AllUser from './pages/AllUsers/AllUser';
import AddUser from './pages/AddUser/AddUser';
import EditUser from './pages/EditUser/EditUser';
import axios from 'axios';
import Layout from './components/Layout';

axios.defaults.baseURL = process.env.REACT_APP_BE_URL;

function App() {
   return (
      <BrowserRouter>
         <Layout>
            <Routes>
               <Route path='/' element={<LandingPage />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<p>Register user</p>} />
               <Route path='/election' element={<Election />} />
               <Route path='/results' element={<AllResults />} />
               <Route path='/results/:address' element={<SingleResult />} />
               <Route path='/users' element={<AllUser />} />
               <Route path='/addUser' element={<AddUser />} />
               <Route path='/addElection' element={<AddElection />} />
               <Route path='/addCandidate' element={<AddCandidate />} />
               <Route path='/editUser' element={<EditUser />} />
               <Route path='/*' element={<p>Wrong page</p>} />
            </Routes>
         </Layout>
         <ToastContainer />
      </BrowserRouter>
   );
}

export default App;
