/**
 * @prettier
 */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useGetResults } from "../../components/hooks/get-results";
import Loading from "../../components/Loading";
import AuthContext from "../../store/auth-context";
const AllResults = () => {
   const [loading, setLoading] = useState(false);
   const { results, names } = useContext(AuthContext);

   //hook to get results
   useGetResults(setLoading);

   return (
      <>
         {!loading && <Link to='/results/efef'>Wrong result</Link>}
         <p>All results</p>

         {!loading && results.length !== 0 && (
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Address</th>
                  </tr>
               </thead>
               <tbody>
                  {names.map(
                     (electionName, i) =>
                        results[i] !== "0x0000000000000000000000000000000000000000" && (
                           <tr key={i}>
                              <td>{names[i]}</td>
                              <td>{results[i]}</td>
                              <td>
                                 <button>
                                    <Link to={`/results/${results[i]}`}>Result</Link>
                                 </button>
                              </td>
                           </tr>
                        )
                  )}
               </tbody>
            </table>
         )}

         {!loading && results.length === 0 && <p>There are no results</p>}

         {loading && <Loading />}
      </>
   );
};
export default AllResults;
