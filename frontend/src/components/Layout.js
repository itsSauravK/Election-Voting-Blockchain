import axios from 'axios';
import { useContext, useState } from 'react';
import { GiPodiumWinner, GiVote } from 'react-icons/gi';
import { SiBlockchaindotcom } from 'react-icons/si';
import { BiHome, BiLogIn, BiLogOut } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import {
   AiFillEdit,
   AiOutlinePlusSquare,
   AiOutlineUserAdd,
   AiFillLinkedin,
   AiFillMail,
} from 'react-icons/ai';
import SideBar from './Sidebar';
const Layout = ({ children }) => {
   const { user, setUser, notify, election } = useContext(AuthContext);
   const [showSidebar, setShowSidebar] = useState(false);
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
      <div className='flex max-h-screen overflow-y-hidden'>
         <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
         <aside className='hidden md:grid h-screen px-4 bg-indigo-500'>
            <ul className='relative text-lg'>
               <li>
                  <SiBlockchaindotcom className='h-10 w-10 text-white mx-16 my-5 ' />
                  <br />
               </li>

               <div className='border-t border-gray-400 py-4'></div>
               {/* No user logged in */}
               {!user && (
                  <>
                     <li className='relative'>
                        <div>
                           <BiLogIn className='inline text-white my-4' />
                           <Link
                              to='/login'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              Login
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <BiHome className='inline text-white my-4' />
                           <Link to='/' className='text-gray-200 h-12 px-3  hover:text-indigo-300'>
                              Home Page
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiPodiumWinner className='inline text-white my-4' />
                           <Link
                              to='/results'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All results
                           </Link>
                        </div>
                     </li>
                  </>
               )}
               {/* user logged in but no election ongoing */}
               {user && user.role === 'user' && !user.electionOngoing && (
                  <>
                     <li className='relative'>
                        <div>
                           <BiHome className='inline text-white my-4' />
                           <Link to='/' className='text-gray-200 h-12 px-3  hover:text-indigo-300'>
                              Home Page
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiPodiumWinner className='inline text-white my-4' />
                           <Link
                              to='/results'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All results
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <BiLogOut className='inline text-white my-4' />
                           <button
                              className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                              onClick={logoutHandler}
                           >
                              Logout
                           </button>
                        </div>
                     </li>
                  </>
               )}
               {/* user logged in and election ongoing */}
               {user && user.role === 'user' && user.electionOngoing && (
                  <>
                     <li className='relative'>
                        <div>
                           <BiHome className='inline text-white my-4' />
                           <Link to='/' className='text-gray-200 h-12 px-3  hover:text-indigo-300'>
                              Home Page
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiVote className='inline text-white my-4' />
                           <Link
                              to='/election'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              Vote
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiPodiumWinner className='inline text-white my-4' />
                           <Link
                              to='/results'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All results
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <BiLogOut className='inline text-white my-4' />
                           <button
                              className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                              onClick={logoutHandler}
                           >
                              Logout
                           </button>
                        </div>
                     </li>
                  </>
               )}
               {/* admin logged in and election ongoing */}
               {user && user.electionOngoing && user.role === 'admin' && (
                  <>
                     <li className='relative'>
                        <div>
                           <BiHome className='inline text-white my-4' />
                           <Link to='/' className='text-gray-200 h-12 px-3  hover:text-indigo-300'>
                              Home Page
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiVote className='inline text-white my-4' />
                           <Link
                              to='/election'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              Manage Election
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiPodiumWinner className='inline text-white my-4' />
                           <Link
                              to='/results'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All results
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <HiUserGroup className='inline text-white my-4' />
                           <Link
                              to='/users'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All users
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <BiLogOut className='inline text-white my-4' />
                           <button
                              className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                              onClick={logoutHandler}
                           >
                              Logout
                           </button>
                        </div>
                     </li>
                  </>
               )}

               {/* Admin , no election ongoing and not added elction yet */}
               {user &&
                  !user.electionOngoing &&
                  user.role === 'admin' &&
                  election === '0x0000000000000000000000000000000000000000' && (
                     <>
                        <li className='relative'>
                           <div>
                              <BiHome className='inline text-white my-4' />
                              <Link
                                 to='/'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Home Page
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <AiOutlinePlusSquare className='inline text-white my-4' />
                              <Link
                                 to='/addElection'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Add Election
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <GiPodiumWinner className='inline text-white my-4' />
                              <Link
                                 to='/results'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 All results
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <HiUserGroup className='inline text-white my-4' />
                              <Link
                                 to='/users'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 All users
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <BiLogOut className='inline text-white my-4' />
                              <button
                                 className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                                 onClick={logoutHandler}
                              >
                                 Logout
                              </button>
                           </div>
                        </li>
                     </>
                  )}
               {/* Admin , no election ongoing and already added elction */}
               {user &&
                  !user.electionOngoing &&
                  user.role === 'admin' &&
                  election !== '0x0000000000000000000000000000000000000000' && (
                     <>
                        <li className='relative'>
                           <div>
                              <BiHome className='inline text-white my-4' />
                              <Link
                                 to='/'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Home Page
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <GiVote className='inline text-white my-4' />
                              <Link
                                 to='/election'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Manage Election
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <AiOutlineUserAdd className='inline text-white my-4' />
                              <Link
                                 to='/addCandidate'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Add Candidate
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <GiPodiumWinner className='inline text-white my-4' />
                              <Link
                                 to='/results'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 All results
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <HiUserGroup className='inline text-white my-4' />
                              <Link
                                 to='/users'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 All users
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <BiLogOut className='inline text-white my-4' />
                              <button
                                 className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                                 onClick={logoutHandler}
                              >
                                 Logout
                              </button>
                           </div>
                        </li>
                     </>
                  )}
               {user && (
                  <>
                     {/* Ethereum Address {user.eAddress} */}
                     <li className='relative'>
                        <div>
                           <AiFillEdit className='inline text-white my-4' />
                           <Link
                              to='/edituser'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              Edit your address
                           </Link>
                        </div>
                     </li>
                  </>
               )}
            </ul>
            <div className='mt-auto'>
               <div className='border-t border-white py-4'></div>
               <p className='text-gray-200 my-5'>
                  Contact developer{' '}
                  <a href='https://www.linkedin.com/in/saurav0211/'>
                     <AiFillLinkedin className='inline' />
                  </a>
                  <a href='mailto:ksaurav0211@gmail.com'>
                     <AiFillMail className='inline' />
                  </a>
               </p>
            </div>
         </aside>
         <main
            className={`flex-1 overflow-y-auto h-screen ${
               showSidebar ? 'bg-gray-400 bg-opacity-80  md:bg-inherit md:bg-opacity-0' : ''
            }`}
         >
            {children}
         </main>
      </div>
   );
};

export default Layout;
