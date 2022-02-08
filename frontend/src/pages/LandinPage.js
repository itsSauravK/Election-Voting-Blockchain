import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
import AuthContext from "../store/auth-context";

const LandingPage = () => {

    const {user, notify} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(  () =>{
        console.log(user);
        if(!user){
            notify('Please login first','error');
            //navigate('/login');
        }
    },[user])
    return(
        <>
            <p>Landing page</p>
        </>
    )

}

export default LandingPage;