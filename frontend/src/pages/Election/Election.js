import { useContext, useEffect, useState } from "react"
import AuthContext from "../../store/auth-context";
import Electioneth from '../../ethereum/election'
import ShowCandidate from "./ShowCandidate";
import Loading from "../../components/Loading";
import {useNavigate} from 'react-router'
import axios from "axios";
import StartElection from "./StartElection";
import EndElection from "./EndElection";
import Factory from '../../ethereum/factory'
import web3 from "../../ethereum/web3";
import { useEndElection } from "../../components/hooks/end-election";

const Election = () => {
    const {user, election, notify, getAccount, validAccount, setElection, setUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    let tempCandidate;
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [candidateCount, setCount] = useState(0);
    const [electionName, setElectionName] = useState('');

    //for validation
    useEffect( () => {
        (async () => {
           
            if(!user){
                notify('Please login first', 'error');
                navigate('/login')
            }else{
                 //get intial value of validAccount, if the user is using right ethereum ot not
                 getAccount();
                //checking if there is no ongoing election
                if(election==='0x0000000000000000000000000000000000000000'){
                    navigate('/');
                 }
                 //election.ongoing is only true if admin adds an election
                if(user.electionOngoing === false && user.role !== 'admin'){
                    notify('There is no ongoing election', 'error');
                    navigate(-1);
                }
            }
        })()
    })
    //to get all candidates
    useEffect( () => {(async() => {
        //try{
            setLoading(true);
            if(election!=='0x0000000000000000000000000000000000000000'){
                const Election = Electioneth(election);
                //getting candidate count
                let count = await Election.methods.candidateCount().call();
                setCount(+count);
                console.log(election);

                //getting election name
                let name = await Election.methods.electionName().call()
                setElectionName(name);

                //getting all candidates and storing in one variable
                
                tempCandidate = await Promise.all(
                    Array(+count).fill(1).map((element, index) => {
                        return Election.methods.candidates(index).call()
                    })
                )
                setCandidates(tempCandidate)
                //console.log(tempCandidate);
                
            }
            setLoading(false);
        })()
    },[])

    // //use effect to remove bug where user rejects second transaction while ending election
    useEndElection('election', setLoading)
    
    console.log(tempCandidate);
    return(
        <>
            {!loading && election!=='0x0000000000000000000000000000000000000000'&&
            <>
                <h1>{electionName}</h1>
                <p>Candidates{candidateCount}</p>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>  
                        <th>Description</th>
                        <th>Votes</th>
                        {user&&user.electionOngoing&&!user.hasVoted&&<th>Vote</th>}
                        {/* <th>Vote</th> */}
                        <th>Image</th>
                    </tr>
                    </thead>

                    <tbody>
                    {candidateCount === 0 && <p>No candidates</p>}
                    {candidateCount && (candidates.map((candidate, index) => (
                        <ShowCandidate 
                        key={index}
                        id={index}
                        candidate={candidate}
                        candidateCount={candidateCount}
                        setLoading={setLoading}
                /> 
                    )) )}
                    </tbody>
                </table>
                {user&& !user.electionOngoing && user.role==='admin' &&
                <StartElection 
                 setLoading={setLoading}
                />}
                {user&& user.electionOngoing && user.role==='admin' &&
                <EndElection 
                 setLoading={setLoading}
                />}
                </>
            }
            {loading&& <Loading />}
        
        </>
    )
}

export default Election;