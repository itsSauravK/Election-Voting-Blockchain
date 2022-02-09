import { useContext } from "react"
import AuthContext from "../../store/auth-context";

const Election = () => {
    const {user} = useContext(AuthContext);
    return(
        <>
        {user && <p>USER candidate page</p>}
        <p>wrw</p>
        </>
    )
}

export default Election;