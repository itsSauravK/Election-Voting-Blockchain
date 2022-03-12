/**
 * @prettier
 */

/*hook to get results
this hook is needed as we will use in allResults page and in context store
Using it in context store ensusre that /electio/:address only displays if the 
election address was created using our currentFactory contract address

*/

import { useEffect, useContext } from 'react';
import Factory from '../../ethereum/factory';
import AuthContext from '../../store/auth-context';
export const useGetResults = (setLoading) => {
   const { setResults, setNames, notify } = useContext(AuthContext);

   useEffect(() => {
      const b = async () => {
         setLoading(true);
         //get all results
         try {
            let electionResults = await Factory.methods.getAllResults().call();
            let electionNames = await Factory.methods.getAllName().call();
            setResults(electionResults);
            setNames(electionNames);
         } catch (err) {
            notify(err.message, 'error');
         }
         setLoading(false);
      };
      b();
      return () => b;
   }, []);
};
