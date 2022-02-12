import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Electioneth from '../../ethereum/election';
import Factory from '../../ethereum/factory'
import web3 from "../../ethereum/web3";
import {useNavigate} from 'react-router-dom'
const EndElection = ({setLoading}) => {

    const { election, notify, validAccount, setUser, setElection} = useContext(AuthContext);
    //fetch api that election has ended
    const navigate = useNavigate();
    const endElectionHandler = async(e) => {
        e.preventDefault()
        setLoading(true);
        //checking if user is using right ethereum account
            if(!validAccount){
                notify('You are using wrong ethereum account', 'error');
                setLoading(false);
                return;
            }
        const Election = Electioneth(election);
        const accounts = await web3.eth.getAccounts();

        try{
            //end election in Election contract
            await Election.methods.endElection().send({
                from: accounts[0]
            })
            //end election in ElectionFactory
            await Factory.methods.clearFactory().send({
                from: accounts[0]
            })
            
        }catch(err){
            notify(err.message,'error');
            setLoading(false)
            navigate('/')
            return
        }
          //changing electionOngoing to false and hasVoted to false
          try{
            await axios.put('http://localhost:4000/api/election/endElection',{
            address: election
            },{
                withCredentials: true,
            })
            //get updated user back
            const response = await axios.get('http://localhost:4000/api/election/getUser',{
                withCredentials: true,
            });
            setUser(response.data.user);
            setElection('0x0000000000000000000000000000000000000000');
            notify('Election has ended', 'success');
        

        }catch(err){
            notify(err.response.data.errMessage,'error');
            setLoading(false);
            return
        }
        
        setLoading(false);
        navigate(`/`);
    }
    
    return(
        <>
            <button onClick={endElectionHandler}>End Election</button>
        </>

    );
}
export default EndElection;