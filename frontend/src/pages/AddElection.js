import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import web3 from "../ethereum/web3";
import factory from '../ethereum/factory'
import AuthContext from "../store/auth-context";
import Loading from "../components/Loading";

const AddElection = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [electionName, setElectionName] = useState('');
    const {user, notify, validAccount, getAccount, setElection, election} = useContext(AuthContext);
    
    const addElectionHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        if(!validAccount){
            notify('You are using wrong ethereum account', 'error');
            return;
        }
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createElection(electionName)
            .send({
                from: accounts[0]
            });
            notify('Election added', 'success');
            //test this
            setElection (await factory.methods.deployedElection().call());
            navigate('/election')
        } catch(err){
            notify(err.message,'error');
        }
        setLoading(false);
    }
    useEffect(  () =>{
        if(!user){
            notify('Please login first','error');
            navigate('/login');
        }else{
            if(user.role !== 'admin'){
                notify('You do not have access to this route', 'error');
                navigate('/');
            }
            if(user.electionOngoing === true){
                notify('There is already an election in progress', 'error');
                navigate('/');
            }
            getAccount();
        }
        if(election!=='0x0000000000000000000000000000000000000000'){
            notify('You have already started an election', 'error');
            navigate('/election')
        }
    },[user])

    return(
        <>
        {!loading && 
        <form onSubmit={addElectionHandler}>
            <label>Election name</label>
            <input value={electionName} onChange={(e) => setElectionName(e.target.value)} />
            <button type='submit' >Add election</button>
        </form>
        }
        {loading && <Loading />}
        </>
    )
}

export default AddElection;