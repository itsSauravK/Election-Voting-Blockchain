/**
 * @prettier
 */
import axios from 'axios';
import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import Electioneth from '../../ethereum/election';
import web3 from '../../ethereum/web3';

const StartElection = ({ setLoading }) => {
   const { user, election, notify, validAccount, setUser, getAccount } = useContext(AuthContext);
   const startElectionHandler = async (e) => {
      e.preventDefault();
      setLoading(true);

      const account = await web3.eth.getAccounts();
      //checking if user is using right ethereum account
      if (account[0] !== user.eAddress) {
         notify('You are using wrong ethereum account', 'error');
         setLoading(false);
         return;
      }

      //starting election in contract
      const Election = Electioneth(election);
      const accounts = await web3.eth.getAccounts();

      try {
         await Election.methods.startElection().send({
            from: accounts[0],
         });
         notify('Election has been started', 'success');
      } catch (err) {
         notify(err.message, 'error');
         setLoading(false);
         return;
      }

      try {
         //changing electionOngoing to true for all user accounts
         await axios.get('/election/startElection', {
            withCredentials: true,
         });
         //retrive changed user database
         const response = await axios.get('/election/getUser', {
            withCredentials: true,
         });
         setUser(response.data.user);
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
         setLoading(false);
         return;
      }
      setLoading(false);
   };

   return (
      <>
         <button
            className='lg:w-40 md:w-30 md:ml-7 lg:ml-7 ml-6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
            onClick={startElectionHandler}
         >
            Start Election
         </button>
      </>
   );
};

export default StartElection;
