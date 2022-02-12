import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useGetResults } from "../../components/hooks/get-results";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import Electioneth from "../../ethereum/election";
import AuthContext from "../../store/auth-context";
import ShowResult from "./ShowResult";
const SingleResult = () => {
  const [loading, setLoading] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [electionName, setElectionName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [candidateCount, setCount] = useState(0);
  const { address } = useParams();
  const { notify, results } = useContext(AuthContext);
  const navigate = useNavigate();

  useGetResults(setLoading);

  useEffect(() => {
    const b = async () => {
      //try{
          console.log(notify);
      setLoading(true);
      //First check if address by user is from our current election
      if (!results.includes(address)) {
        
        navigate(-1);
        notify("Wrong address", "error");

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
          console.log(tempCandidate[0]);
          //sort tempCandidates
          tempCandidate.sort((a, b) => b.votes - a.votes);
          //checking for draw
          if (
            +count >= 2 &&
            +tempCandidate[0].votes == +tempCandidate[1].votes
          ) {
            setIsDraw(true);
          }

          setCandidates(tempCandidate);
        } catch (err) {
          notify(err.message, "error");
        }
      }

      setLoading(false);
    };
    b();
    return () => b;
  }, []);
  return (
    <>
    
      {loading && <Loading />}
      {!loading && <h1>{electionName}</h1>}
      {!loading && candidateCount === 0 && <p>No candidates found</p>}
      {!loading && candidateCount > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Votes</th>
              <th>Image</th>
            </tr>
            {candidates.map((candidate, index) => (
              <ShowResult
                key={index}
                id={index}
                candidate={candidate}
                isDraw={isDraw}
              />
            ))}
          </thead>
        </table>
      )}
    </>
  );
};

export default SingleResult;
