import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import AuthContext from '../../store/auth-context';

const EditUser = () => {
   const { user, setUser, notify } = useContext(AuthContext);
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const n = !user ? '' : user.name;
   const e = !user ? '' : user.eAddress;
   const [name, setName] = useState(n);
   const [eAddress, setEAddress] = useState(e);
   useEffect(() => {
      if (!user) {
         notify('Please login first', 'error');
         navigate('/login');
      } else {
         //checking if there is an ongoing election
         if (user.electionOngoing === true) {
            notify('You cannot edit your name and account during election', 'error');
            navigate(-1);
            return;
         }
      }
   }, []);

   const editUserHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const response = await axios.put(
            '/election/edit',
            {
               name,
               eAddress,
            },
            {
               withCredentials: true,
               headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            }
         );
         notify('Your details has been edited', 'success');
         //setting user useStae defined in context
         setUser(response.data.user);
         navigate(-1);
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
                        Edit Profile
                     </h2>
                  </div>
                  <form className='mt-8 space-y-6' onSubmit={editUserHandler}>
                     <div className='rounded-md shadow-sm space-y-4'>
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
                        {/* Eth Address*/}
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

                     <div>
                        <button
                           type='submit'
                           className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
                        >
                           Edit Profile
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

export default EditUser;
