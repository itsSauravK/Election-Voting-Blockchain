import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import AuthContext from "../store/auth-context";
import factory from '../ethereum/factory'

const LandingPage = () => {

    const {user, notify} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(  () =>{
        if(!user){
            notify('Please login first','error');
            //navigate('/login');
        }
    },[user])
    useEffect( async () => {
        const election = await factory.methods.deployedElection().call();
        console.log(election)
    })
    return(
        <>
            {!user&&<Link to ='/login'><button>Login</button></Link>}
            {user&&
                //check if election has started
                    //vote 
                //election not started
                    //add if admin
                    //display message if user
                    <p>Welcome</p>
            }
            <p>Landing page</p>
        </>
    )

}

export default LandingPage;