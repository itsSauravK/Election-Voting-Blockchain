/**
 * @prettier
 */
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Electioneth from '../../ethereum/election';
import Factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useNavigate } from 'react-router-dom';
const EndElection = ({ setLoading }) => {
   const { user, election, notify, validAccount, setUser, setElection, getAccount } =
      useContext(AuthContext);
   //fetch api that election has ended
   const navigate = useNavigate();
   const endElectionHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      const account = await web3.eth.getAccounts();
      //checking if user is using right ethereum account
      if (account[0] !== user.eAddress) {
         notify('You are using wrong ethereum account', 'error');
         setLoading(false);
         return;
      }

      const Election = Electioneth(election);
      const accounts = await web3.eth.getAccounts();

      try {
         //end election in Election contract
         await Election.methods.endElection().send({
            from: accounts[0],
         });
         //end election in ElectionFactory
         await Factory.methods.clearFactory().send({
            from: accounts[0],
         });
      } catch (err) {
         notify(err.message, 'error');
         setLoading(false);
         navigate('/');
         return;
      }
      //changing electionOngoing to false and hasVoted to false
      try {
         await axios.put(
            'election/endElection',
            {
               address: election,
            },
            {
               withCredentials: true,
            }
         );
         //get updated user back
         const response = await axios.get('election/getUser', {
            withCredentials: true,
         });
         setUser(response.data.user);
         setElection('0x0000000000000000000000000000000000000000');
         notify('Election has ended', 'success');
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
         setLoading(false);
         return;
      }

      setLoading(false);
      navigate(`/`);
   };

   return (
      <>
         <button onClick={endElectionHandler}>End Election</button>
      </>
   );
};
export default EndElection;
