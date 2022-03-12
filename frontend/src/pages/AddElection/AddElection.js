/**
 * @prettier
 */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import AuthContext from '../../store/auth-context';
import Loading from '../../components/Loading';
import { useUserValidation } from '../../components/hooks/user-validation';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';

const AddElection = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState();
   const [electionName, setElectionName] = useState('');
   const { notify, validAccount, setElection } = useContext(AuthContext);
   useUserValidation(false);

   const addElectionHandler = async (event) => {
      event.preventDefault();
      setLoading(true);

      if (!validAccount) {
         notify('You are using wrong ethereum account', 'error');
         setLoading(false);
         return;
      }
      try {
         const accounts = await web3.eth.getAccounts();
         await factory.methods
            //adding an election in smart contract
            //here election.omGoing is still false since admin did not start elction
            .createElection(electionName)
            .send({
               from: accounts[0],
            });
         notify('Election added', 'success');
         //test this
         let address = await factory.methods.deployedElection().call();
         setElection(address);
         navigate('/election');
      } catch (err) {
         notify(err.message, 'error');
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
                        Add Election
                     </h2>
                  </div>
                  <form className='mt-8 space-y-6' onSubmit={addElectionHandler}>
                     <div className='rounded-md shadow-sm space-y-4'>
                        {/* Name */}

                        <div>
                           <label
                              htmlFor='electionName'
                              className='block text-sm font-medium text-gray-700'
                           >
                              Election Name
                           </label>

                           <div className='mt-1 relative rounded-md shadow-sm'>
                              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                 <MdOutlineDriveFileRenameOutline
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                 />
                              </div>

                              <input
                                 name='electionName'
                                 id='electionName'
                                 className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                 value={electionName}
                                 onChange={(e) => setElectionName(e.target.value)}
                                 placeholder="Enter Election's name"
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
                           Add Election
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

export default AddElection;
