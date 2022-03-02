/**
 * @prettier
 */
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import Electioneth from '../../ethereum/election';
import axios from 'axios';
import web3 from '../../ethereum/web3';
import { useNavigate } from 'react-router';

const ShowCandidate = ({ id, candidate, candidateCount, setLoading }) => {
   const { user, validAccount, notify, election, setUser } = useContext(AuthContext);
   const [vote, setVote] = useState(+candidate.votes);
   const navigate = useNavigate();
   useEffect(() => {
      const b = async () => {
         const Election = Electioneth(election);
         let newCandidate = await Election.methods.candidates(id).call();
         let candidateVote = newCandidate.votes;
         setVote(candidateVote);
         console.log(vote);
      };
      b();
      return () => b;
   });
   const voteHandler = async (e) => {
      e.preventDefault();
      setLoading(true);

      const account = await web3.eth.getAccounts();
      if (account[0] !== user.eAddress) {
         notify('You are using wrong ethereum account', 'error');
         setLoading(false);
         return;
      }
      //voting the candidate and retriving latest candidate vote count
      try {
         const Election = Electioneth(election);
         const accounts = await web3.eth.getAccounts();
         await Election.methods.voteCandidate(id).send({
            from: accounts[0],
         });
         setVote((prevVote) => prevVote + 1);
         notify('You have successfully voted a candidate', 'success');
      } catch (err) {
         notify(err.message, 'error');
         setLoading(false);
         return;
      }
      try {
         //send a put request
         const response = await axios.put(
            '/election/vote',
            {},
            {
               withCredentials: true,
            }
         );
         setUser(response.data.user);
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
         setLoading(false);
         return;
      }

      console.log(vote);

      setLoading(false);
      // navigate('/election')
   };
   return (
      <>
         <tr>
            <td>{candidate.name}</td>
            <td>{candidate.description}</td>
            <td>{vote}</td>
            {user && user.electionOngoing && !user.hasVoted && (
               <td>
                  <button onClick={voteHandler}>Vote</button>
               </td>
            )}
            {/* <td><button onClick={voteHandler}>Vote</button></td> */}
            <td>{candidate.url}</td>
         </tr>
      </>
   );
};
export default ShowCandidate;
