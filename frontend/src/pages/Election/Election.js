/**
 * @prettier
 */
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import Electioneth from '../../ethereum/election';
import ShowCandidate from './ShowCandidate';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router';
import StartElection from './StartElection';
import EndElection from './EndElection';
import { useEndElection } from '../../components/hooks/end-election';
import { Link } from 'react-router-dom';

const Election = () => {
   const { user, election, notify } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);
   let tempCandidate;
   const navigate = useNavigate();
   const [candidates, setCandidates] = useState([]);
   const [candidateCount, setCount] = useState(0);
   const [electionName, setElectionName] = useState('');

   //for validation
   useEffect(() => {
      (async () => {
         if (!user) {
            notify('Please login first', 'error');
            navigate('/login');
         } else {
            //get intial value of validAccount, if the user is using right ethereum ot not
            //getAccount();
            //checking if there is no ongoing election
            if (election === '0x0000000000000000000000000000000000000000') {
               navigate('/');
            }
            //election.ongoing is only true if admin adds an election
            if (user.electionOngoing === false && user.role !== 'admin') {
               notify('There is no ongoing election', 'error');
               navigate('/');
            }
         }
      })();
   });
   //to get all candidates
   useEffect(() => {
      let b = async () => {
         //try{
         setLoading(true);
         if (election !== '0x0000000000000000000000000000000000000000') {
            const Election = Electioneth(election);
            //getting candidate count
            let count = await Election.methods.candidateCount().call();
            setCount(+count);

            //getting election name
            let name = await Election.methods.electionName().call();
            setElectionName(name);

            //getting all candidates and storing in one variable

            tempCandidate = await Promise.all(
               Array(+count)
                  .fill(1)
                  .map((element, index) => {
                     return Election.methods.candidates(index).call();
                  })
            );
            setCandidates(tempCandidate);
            //console.log(tempCandidate);
         }
         setLoading(false);
      };
      b();
      return () => {
         b = null;
      };
   }, []);

   // //use effect to remove bug where user rejects second transaction while ending election
   useEndElection('election', setLoading);

   return (
      <>
         {!loading && candidateCount >= 0 && (
            <h2 className='mt-5 text-center text-3xl font-bold mb-8 text-gray-900'>
               {electionName}
            </h2>
         )}
         {!loading && candidateCount === 0 && (
            <h2 className='mt-5 text-center text-3xl font-bold mb-8 text-gray-900'>
               No Candidates
            </h2>
         )}
         {!loading &&
            election !== '0x0000000000000000000000000000000000000000' &&
            candidateCount > 0 && (
               <>
                  {/* <th>Vote</th> */}
                  <div className=''>
                     <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 '>
                        {candidateCount &&
                           candidates.map((candidate, index) => (
                              <ShowCandidate
                                 key={index}
                                 id={index}
                                 candidate={candidate}
                                 candidateCount={candidateCount}
                                 setLoading={setLoading}
                              />
                           ))}
                     </div>
                     <div className='flex mt-3 relative justify-center'>
                        {user && !user.electionOngoing && user.role === 'admin' && (
                           <>
                              <StartElection setLoading={setLoading} />

                              <Link to='/addCandidate '>
                                 <button className='lg:w-40 md:w-30 ml-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'>
                                    Add Candidate
                                 </button>
                              </Link>
                           </>
                        )}
                     </div>
                     <div className='flex justify-end lg:px-24 md:px-8 px-4 '>
                        {user && user.electionOngoing && user.role === 'admin' && (
                           <button className='w-40 ml-6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'>
                              <EndElection setLoading={setLoading} />
                           </button>
                        )}
                     </div>
                  </div>
               </>
            )}
         {loading && <Loading />}
      </>
   );
};

export default Election;
