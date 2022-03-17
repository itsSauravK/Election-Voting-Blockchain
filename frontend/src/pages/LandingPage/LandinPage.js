/**
 * @prettier
 */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import AuthContext from '../../store/auth-context';
import Loading from '../../components/Loading';
import { useEndElection } from '../../components/hooks/end-election';

const LandingPage = () => {
   const [loading, setLoading] = useState(false);
   const { user, notify, election } = useContext(AuthContext);
   // useEffect(() => {
   //    if (!user) {
   //       notify("Please login first", "error");
   //       //navigate('/login');
   //    }
   // }, [user]);

   //use effect to remove bug where user rejects second transaction while ending election
   useEndElection('', setLoading);

   return (
      <>
         <div className='flex flex-col justify-center items-center my-auto mx-5 h-screen  '>
            <h2 className='pb-4 text-center text-3xl font-extrabold text-gray-900'>
               Online Voting System
            </h2>
            <div className={`flex filter flex-col lg:flex-row rounded-lg py-4 `}>
               <div className='my-auto mx-auto items-center justify-center pl-2'>
                  <img
                     className='mt-3  max-w-lg lg:h-48 lg:w-48 md:h-56 md:w-56 w-32 h-32 rounded-md object-cover'
                     src={`https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80`}
                  />
               </div>

               <div className='py-4 px-8 flex flex-col my-auto md:max-w-l lg:max-w-md'>
                  <p className='text-gray-700 mb-4 text-sm'>
                     Welecome to Online Voting System, a secured voting system built using Ethereum
                     blockchain. Your vote will be confidential and will not be revealed to anyone
                  </p>
                  {/* No user */}
                  {!loading && !user && (
                     <Link to='/login'>
                        <button className='group relative w-2/5 lg:mx-0 md:mx-auto mx-auto flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'>
                           Login
                        </button>
                     </Link>
                  )}

                  {/*User and election ongoing */}
                  {!loading && user && user.electionOngoing && (
                     <Link to='/election'>
                        <button className='group relative w-2/5 lg:mx-0 md:mx-auto mx-auto flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'>
                           Vote now
                        </button>
                     </Link>
                  )}

                  {/* User role and no election ongoing */}
                  {!loading && user && user.role === 'user' && !user.electionOngoing && (
                     <p className='text-center font-semibold'>No election ongoing</p>
                  )}

                  {/* Admin role and no election ongoing */}
                  {!loading &&
                     user &&
                     user.role === 'admin' &&
                     !user.electionOngoing &&
                     election === '0x0000000000000000000000000000000000000000' && (
                        <Link to='/addElection'>
                           <button className='group relative w-2/5 lg:mx-0 md:mx-auto mx-auto flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'>
                              Start Election
                           </button>
                        </Link>
                     )}

                  {/*Admin role and added an election but did not start it*/}
                  {!loading &&
                     user &&
                     user.role === 'admin' &&
                     !user.electionOngoing &&
                     election !== '0x0000000000000000000000000000000000000000' && (
                        <Link to='/election'>
                           <button className='group relative w-2/5 lg:mx-0 md:mx-auto mx-auto flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'>
                              Go to Election
                           </button>
                        </Link>
                     )}
               </div>
            </div>
            {user && (
               <div className='mt-4 text-md text-gray-900'>
                  <p className='text-center font-bold'>User Details</p>
                  <p className='mb-4'>Name : {user.name}</p>
                  <p>Address : {user.eAddress}</p>
               </div>
            )}
         </div>

         {loading && <Loading />}
      </>
   );
};

export default LandingPage;
