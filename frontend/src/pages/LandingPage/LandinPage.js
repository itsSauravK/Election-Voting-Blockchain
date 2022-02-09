
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";


const LandingPage = () => {

    const {user, notify, election} = useContext(AuthContext);
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