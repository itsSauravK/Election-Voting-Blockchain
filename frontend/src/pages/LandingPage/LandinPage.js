
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Electioneth from "../../ethereum/election";
import Factory from '../../ethereum/factory'
import web3 from "../../ethereum/web3";
import {useNavigate} from 'react-router'
import axios from "axios";
import AuthContext from "../../store/auth-context";
import Loading from "../../components/Loading";


const LandingPage = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user, notify, election, setUser, setElection} = useContext(AuthContext);
    useEffect(  () =>{
        if(!user){
            notify('Please login first','error');
            //navigate('/login');
        }
    },[user])

    //use effect to remove bug where user rejects second transaction while ending election
    useEffect(()=>{
        (async()=>{
            
            if(election!=='0x0000000000000000000000000000000000000000')
            {
                setLoading(true);
                const Election = Electioneth(election);
                const accounts = await web3.eth.getAccounts();
                let started = await Election.methods.started().call();
                let ended = await Election.methods.ended().call();
                //checking if correct election has ended
                if(!started && ended){
                    //removing election from factory
                    try{
                        await Factory.methods.clearFactory().send({
                            from: accounts[0]
                        })
                        notify('Election has ended', 'success');
                    }
                    catch(err){
                        notify('You need to end the election to proceed', 'error')
                        setLoading(false)
                        navigate('/election')
                        return;
                    }
                    
                //changing electionOngoing to false and hasVoted to false
                    try{
                        setLoading(true);
                        axios.put('http://localhost:4000/api/election/endElection',{
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
                        navigate(`/`);
                    

                    }catch(err){
                        notify(err.response.data.errMessage,'error');
                        setLoading(false);
                        return
                    }
                }
                setLoading(false);
                
            }

        })()
    },[])
    
    return(
        <>
            {/* No user */}
            {!loading && !user&&<Link to ='/login'><button>Login</button></Link>}

            {/*User and election ongoing */}
            {!loading && user&& user.electionOngoing && 
            <Link to= '/election'><button>Vote now</button></Link>}

            {/* User role and no election ongoing */}
            {!loading && user && user.role==='user' && !user.electionOngoing && 
            <p>No election ongoing</p>}

            {/* Admin role and no election ongoing */}
            {!loading && user && user.role==='admin' && !user.electionOngoing && election==='0x0000000000000000000000000000000000000000' &&
             <Link to= '/addElection'><button>Start Election</button></Link> }

            {/*Admin role and added an election but did not start it*/}
            {!loading && user && user.role==='admin' && !user.electionOngoing && election!=='0x0000000000000000000000000000000000000000' &&
            <Link to= '/election'><button>Go to Election</button></Link>}

            {loading && <Loading />}

            {!!election && <p>wrwr</p>}
            <p>Landing page</p>
        </>
    )

}

export default LandingPage;