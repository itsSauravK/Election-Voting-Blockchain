import { useEffect ,useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useGetResults } from "../../components/hooks/get-results";
import Loading from "../../components/Loading";
import Factory from '../../ethereum/factory'
import AuthContext from "../../store/auth-context";
const AllResults = () => {

    const [loading, setLoading] = useState(false);
    const {results, setResults, notify, names, setNames} = useContext(AuthContext);

    //hook to get results
    useGetResults(setLoading);
    
    return(
        <>
            <p>All results</p>
            
                {!loading && results.length!==0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                    {names.map((electionName, i) => (
                        <tr>
                            <td>{names[i]}</td>
                            <td>{results[i]}</td>
                            <td><button><Link to = {`/results/${results[i]}`}>Result</Link></button></td>
                        </tr>
                        ))

                    }
                    </tbody>
                </table>}

                {!loading && results.length===0 && <p>There are no results</p>}

                {loading && <Loading />}

            
        </>
    )
}   
export default AllResults;