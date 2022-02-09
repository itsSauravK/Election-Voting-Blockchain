import { useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router";
export const useUserValidation = (electionStarted) => {

    const {user, notify, getAccount, election} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(  () =>{
        if(!user){
            notify('Please login first','error');
            navigate('/login');
        }else{
            if(user.role !== 'admin'){
                notify('You do not have access to this route', 'error');
                navigate(-1);
            }
            if(user.electionOngoing === true){
                notify('There is already an election in progress', 'error');
                navigate(-1);
            }
            getAccount();
        }
        //if electionStarted false - this runs for /addElection page
        if(!electionStarted){
            if(election!=='0x0000000000000000000000000000000000000000'){
                notify('You have already started an election', 'error');
                navigate(-1)
            }
        }
        
    },[user])
}