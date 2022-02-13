import axios from 'axios';
import { useContext } from 'react';

import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
const SideBar = () => {
   const { user, setUser, notify } = useContext(AuthContext);

   const logoutHandler = async () => {
      try {
         await axios.get('http://localhost:4000/api/election/logout', {
            withCredentials: true,
         });
         setUser(null);
         notify('User Logged out', 'success');
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
      }
   };
   return (
      <div className='top-0 right-0 fixed'>
         <h2 className='text-center'>This is the sidebar</h2>
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
               <Link to='/election'>Election</Link>
            </li>
            <li>
               <Link to='/results'>All results</Link>
            </li>
         </ul>
      </div>
   );
};

export default SideBar;
