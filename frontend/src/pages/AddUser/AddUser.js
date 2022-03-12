import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import AuthContext from '../../store/auth-context';

const AddUser = () => {
   const { user, notify } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [eAddress, setEAddress] = useState('');

   useEffect(() => {
      if (!user) {
         notify('You need to login first', 'error');
         navigate('/login');
      } else {
         if (user.role === 'user') {
            notify('You do not have access to this route', 'error');
            navigate('/');
         }
         if (user.role === 'admin' && user.electionOngoing) {
            notify('You cannot register a user after starting an election');
            navigate('/');
         }
      }
   });

   const userRegisterHandler = async (e) => {
      e.preventDefault();
      try {
         setLoading(true);
         await axios.post(
            '/election/register',
            {
               name,
               email,
               eAddress,
            },
            {
               withCredentials: true,
            }
         );
         notify('User has been registered', 'success');
         navigate('/users');
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
      }
      setLoading(false);
   };
   return (
      <>
         {!loading && (
            <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-16 sm:px-6 lg:px-8'>
               <div className='max-w-md w-full  space-y-8'>
                  <div>
                     <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Register an user
                     </h2>
                  </div>
                  <form className='mt-8 space-y-6' onSubmit={userRegisterHandler}>
                     <div className='rounded-md shadow-sm space-y-4'>
                        {/* Email */}
                        <div>
                           <label
                              htmlFor='email'
                              className='block text-sm font-medium text-gray-700'
                           >
                              Email
                           </label>
                           <div className='mt-1 relative rounded-md shadow-sm'>
                              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                 <AiOutlineMail
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                 />
                              </div>
                              <input
                                 type='email'
                                 name='email'
                                 id='email'
                                 className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                 placeholder='you@example.com'
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 required
                              />
                           </div>
                        </div>

                        {/* Name */}

                        <div>
                           <label
                              htmlFor='name'
                              className='block text-sm font-medium text-gray-700'
                           >
                              Username
                           </label>

                           <div className='mt-1 relative rounded-md shadow-sm'>
                              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                 <MdOutlineDriveFileRenameOutline
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                 />
                              </div>

                              <input
                                 name='name'
                                 id='name'
                                 className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                 value={name}
                                 placeholder="Enter user's name"
                                 onChange={(e) => setName(e.target.value)}
                                 required
                              />
                           </div>
                        </div>
                        <div>
                           <label
                              htmlFor='email'
                              className='block text-sm font-medium text-gray-700'
                           >
                              Account Address
                           </label>
                           <div className='mt-1 relative rounded-md shadow-sm'>
                              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                 <FaEthereum className='h-5 w-5 text-gray-400' aria-hidden='true' />
                              </div>
                              <input
                                 name='eAddress'
                                 id='eAddress'
                                 className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                 placeholder='0x0000000000000000000000000000000000000000'
                                 value={eAddress}
                                 onChange={(e) => {
                                    setEAddress(e.target.value);
                                 }}
                                 required
                              />
                           </div>
                        </div>
                     </div>

                     {/* Eth Address*/}

                     <div>
                        <button
                           type='submit'
                           className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
                        >
                           Register
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
         {loading && <Loading />}
      </>
   );
};
export default AddUser;
