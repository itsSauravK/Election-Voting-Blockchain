import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import ShowUser from './ShowUser';
const AllUser = () => {
   const { user, notify } = useContext(AuthContext);
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   useEffect(() => {
      const b = async () => {
         if (!user) {
            notify('You need to login first', 'error');
            navigate('/login');
         } else {
            if (user.role === 'user') {
               notify('You do not have access to this route', 'error');
               navigate('/');
            } else {
               //get user data
               try {
                  setLoading(true);
                  const response = await axios.get('/election/allUsers', {
                     withCredentials: true,
                  });
                  setUsers(response.data.users);
               } catch (err) {
                  notify(err.response.data.errMessage, 'error');
               }
               setLoading(false);
            }
         }
      };
      b();
   }, []);
   return (
      <>
         {loading && <Loading />}
         <div className='flex flex-col mt-5 overflow-x-hidden overflow-y-hidden'>
            <div className='-my-2 overflow-x-auto sm:-mx-8 sm:px-4 lg:px-8'>
               <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div>
                     <h2 className='mt-5 text-center text-3xl font-bold mb-8 text-gray-900'>
                        All users
                     </h2>
                  </div>
                  <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                     <table className='min-w-full divide-y divide-gray-300 overflow-x-scroll '>
                        <thead className='bg-indigo-500'>
                           <tr>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
                              >
                                 Name
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 mx-12 py-3 text-left text-xs font-medium text-white uppercase tracking-wider max-w-md'
                              >
                                 Ethereum Address
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
                              >
                                 Status
                              </th>
                              <th
                                 scope='col'
                                 className='px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
                              >
                                 Role
                              </th>
                              {user && !user.electionOngoing && (
                                 <th scope='col' className='relative px-6 py-3'>
                                    <span className='sr-only'>Delete</span>
                                 </th>
                              )}
                           </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                           {users.length > 0 &&
                              users.map((singleUser, element) => (
                                 <ShowUser
                                    key={element}
                                    id={singleUser._id}
                                    user={singleUser}
                                    setLoading={setLoading}
                                    loading={loading}
                                    setUsers={setUsers}
                                 />
                              ))}
                        </tbody>
                     </table>
                  </div>

                  {!loading && user && !user.electionOngoing && (
                     <button className='border border-transparent py-2 mt-5 w-40 rounded-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'>
                        <Link to='/addUser'> Register user</Link>
                     </button>
                  )}
               </div>
            </div>
         </div>
         {!loading && users.length === 0 && <p>No user</p>}
      </>
   );
};
export default AllUser;
