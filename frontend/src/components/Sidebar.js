import axios from 'axios';
import { useContext } from 'react';
import {GiVote} from 'react-icons/gi'
import {BiAnchor} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
const SideBar = (props) => {
   const { user, setUser, notify } = useContext(AuthContext);

   const logoutHandler = async () => {
      try {
         await axios.get('/election/logout', {
            withCredentials: true,
         });
         setUser(null);
         notify('User Logged out', 'success');
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
      }
   };
   return (
      <div className='flex '>
         <div className='flex w-80 bg-indigo-400 h-screen'>
            <BiAnchor className = 'h-10 w-10 text-blue-800' /><br />
            <ul>
               {!user && (
                  <li>
                     <Link to='/login '>Login</Link>
                  </li>
               )}
               <li>
                  <Link to='/ '>Landing page</Link>
               </li>
               <li>
                  <button onClick={logoutHandler}>Logout</button>
               </li>
               <li>
                  <Link to='/login '>Login</Link>
               </li>
               <li>
                  <Link to='/addElection '>Add election</Link>
               </li>
               <li>
                  <Link to='/addCandidate '>Add candidate</Link>
               </li>
               <li>
                  <div>
                     <GiVote className='inline text-blue-800' /> <Link to='/election' className='text-white'>Election</Link>
                  </div>
               </li>
               <li>
                  <Link to='/results'>All results</Link>
               </li>
               <li>
                  <Link to='/users'>All users</Link>
               </li>
               <li>
                  <Link to='/editUser'>Edit user</Link>
               </li>
            </ul>
         </div>
         <div className='w-full'>{props.children}</div>
      </div>
   );
};

export default SideBar;
