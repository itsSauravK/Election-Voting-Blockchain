import axios from 'axios';
import { useContext } from 'react';

import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
const SideBar = (props) => {
   const { user, setUser, notify } = useContext(AuthContext);

   const logoutHandler = async () => {
      try {
         await axios.get('api/election/logout', {
            withCredentials: true,
         });
         setUser(null);
         notify('User Logged out', 'success');
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
      }
   };
   return (
      <div className='flex'>
         <div className='fixed-width 100'>
            <h2>This is the sidebar</h2>
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
               <li>
                  <Link to='/users'>All users</Link>
               </li>
            </ul>
         </div>
         <div className='w-full'>{props.children}</div>
      </div>
   );
};

export default SideBar;
