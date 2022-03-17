/**
 * @prettier
 */
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { useGetResults } from '../../components/hooks/get-results';
import Loading from '../../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import Electioneth from '../../ethereum/election';
import AuthContext from '../../store/auth-context';
import ShowResult from './ShowResult';
import confetti from 'canvas-confetti';
const SingleResult = () => {
   const [loading, setLoading] = useState(false);
   const [isDraw, setIsDraw] = useState(false);
   const [electionName, setElectionName] = useState('');
   const [candidates, setCandidates] = useState([]);
   const [candidateCount, setCount] = useState(0);
   const { address } = useParams();
   const { notify, results } = useContext(AuthContext);
   const navigate = useNavigate();

   useGetResults(setLoading);

   useEffect(() => {
      let b = async () => {
         //try{

         setLoading(true);
         //First check if address by user is from our current election
         if (!results.includes(address)) {
            navigate(-1);
            notify('Wrong address', 'error');
         } else {
            try {
               const Election = Electioneth(address);
               //getting candidate count
               let count = await Election.methods.candidateCount().call();
               setCount(+count);

               //getting election name
               let name = await Election.methods.electionName().call();
               setElectionName(name);

               //getting all candidates and storing in one variable
               let tempCandidate = await Promise.all(
                  Array(+count)
                     .fill(1)
                     .map((element, index) => {
                        return Election.methods.candidates(index).call();
                     })
               );

               //sort tempCandidates
               tempCandidate.sort((a, b) => b.votes - a.votes);
               //checking for draw
               if (+count >= 2 && +tempCandidate[0].votes === +tempCandidate[1].votes) {
                  setIsDraw(true);
               }

               setCandidates(tempCandidate);
               if (!isDraw && count >= 1)
                  confetti({
                     particleCount: 250,
                  });
            } catch (err) {
               notify(err.message, 'error');
            }
         }

         setLoading(false);
      };
      b();
      return () => (b = null);
   }, []);
   return (
      <>
         {loading && <Loading />}
         {!loading && candidateCount === 0 && <p>No candidates found</p>}
         {!loading && candidateCount > 0 && (
            <div className='flex flex-col'>
               <div>
                  <h2 className='mt-5 text-center text-3xl font-bold mb-8 text-gray-900'>
                     {electionName}
                  </h2>
               </div>
               <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 '>
                  {candidates.map((candidate, index) => (
                     <ShowResult key={index} id={index} candidate={candidate} isDraw={isDraw} />
                  ))}
               </div>
               <button className='border border-transparent ml-6 py-2 mt-5 w-40 rounded-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'>
                  <Link to='/results'> All results</Link>
               </button>
            </div>
         )}
      </>
   );
};

export default SingleResult;
