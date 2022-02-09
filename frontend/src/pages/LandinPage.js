import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import AuthContext from "../store/auth-context";
import factory from '../ethereum/factory'

const LandingPage = () => {

    const {user, notify, loading, election} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(  () =>{
        if(!user){
            notify('Please login first','error');
            //navigate('/login');
        }
    },[user])
    
    return(
        <>
            {/* No user */}
            {!user&&<Link to ='/login'><button>Login</button></Link>}

            {/*User and election ongoing */}
            {user&& user.electionOngoing && 
            <Link to= '/election'><button>Vote now</button></Link>}

            {/* User role and no election ongoing */}
            {user && user.role==='user' && !user.electionOngoing && 
            <p>No election ongoing</p>}

            {/* Admin role and no election ongoing */}
            {user && user.role==='admin' && !user.electionOngoing && election==='0x0000000000000000000000000000000000000000' &&
             <Link to= '/addElection'><button>Start Election</button></Link> }

            {/*Admin role and added an election */}
            {user && user.role==='admin' && !user.electionOngoing && election!=='0x0000000000000000000000000000000000000000' &&
            <Link to= '/election'><button>Go to Election</button></Link>}


            {!!election && <p>wrwr</p>}
            <p>Landing page</p>
        </>
    )

}

export default LandingPage;