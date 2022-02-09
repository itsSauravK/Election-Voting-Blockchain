import { useContext, useState } from "react"
import { useUserValidation } from "../components/hooks/user-validation";
import AuthContext from "../store/auth-context";

const AddCandidate = () => {
    const {user} = useContext(AuthContext);
    const {loading, setLoading} = useState(false);
    useUserValidation(true);

    return(
        
        <>

        {user && <p>USER candidate page</p>}
        <p>wrw</p>
        </>
    )
}

export default AddCandidate;