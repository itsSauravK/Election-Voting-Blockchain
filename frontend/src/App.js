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

function App() {
   return (
      <BrowserRouter>
         <SideBar>
            <Routes>
               <Route path='/' element={<LandingPage />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<p>Register user</p>} />
               <Route path='/election' element={<Election />} />
               <Route path='/results' element={<AllResults />} />
               <Route path='/results/:address' element={<SingleResult />} />
               <Route path='/users' element={<p>ewew</p>} />
               <Route path='/users/:id' element={<p>Edit USer</p>} />
               <Route path='/addElection' element={<AddElection />} />
               <Route path='/addCandidate' element={<AddCandidate />} />
               <Route path='/*' element={<p>Wrong page</p>} />
            </Routes>
         </SideBar>
         <ToastContainer />
      </BrowserRouter>
   );
}

export default App;
