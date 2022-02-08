import { useContext, useEffect } from "react"
import { useNavigate } from "react-router";
import AuthContext from "../store/auth-context";

const AddElection = () => {
    const navigate = useNavigate();
    const {user, notify} = useContext(AuthContext);
    useEffect(  () =>{
        if(!user){
            notify('Please login first','error');
            navigate('/login');
        }
    },[user])
    return(
        <>
        {user && <p>USER candidate page</p>}
        <p>wrw</p>
        </>
    )
}

export default AddElection;