/**
 * @prettier
 */
import { useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router';
export const useUserValidation = (electionStarted) => {
   const { user, notify, election, getAccount } = useContext(AuthContext);
   const navigate = useNavigate();
   useEffect(() => {
      if (!user) {
         notify('Please login first', 'error');
         navigate('/login');
      } else {
         if (user.role !== 'admin') {
            notify('You do not have access to this route', 'error');
            navigate(-1);
            return;
         }
         //checking if there is an ongoing election
         if (user.electionOngoing === true) {
            notify('There is already an election in progress', 'error');
            navigate(-1);
            return;
         }
         //this condition is for /addElection
         if (!electionStarted) {
            if (election !== '0x0000000000000000000000000000000000000000') {
               notify('You have already started an election', 'error');
               navigate(-1);
            }
         }
         //this condition is for /addCandidate
         if (electionStarted) {
            if (election === '0x0000000000000000000000000000000000000000') {
               notify('You need to start and election first', 'error');
               navigate('/addElection');
            }
         }
         // getAccount() compares the address stored in user with etheremum account address of user
         // it sets intial value of valid account
         getAccount();
      }
   }, [user]);
};
