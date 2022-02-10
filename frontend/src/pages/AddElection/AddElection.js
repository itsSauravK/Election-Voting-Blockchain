import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import web3 from "../../ethereum/web3";
import factory from '../../ethereum/factory'
import AuthContext from "../../store/auth-context";
import Loading from "../../components/Loading";
import { useUserValidation } from "../../components/hooks/user-validation";

const AddElection = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [electionName, setElectionName] = useState('');
    const {notify, validAccount, setElection} = useContext(AuthContext);
    useUserValidation(false);
    
    const addElectionHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        if(!validAccount){
            notify('You are using wrong ethereum account', 'error');
            setLoading(false);
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