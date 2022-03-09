/**
 * @prettier
 */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetResults } from '../../components/hooks/get-results';
import Loading from '../../components/Loading';
import AuthContext from '../../store/auth-context';
const AllResults = () => {
   const [loading, setLoading] = useState(false);
   const { results, names } = useContext(AuthContext);

   //hook to get results
   useGetResults(setLoading);

   return (
      <>
         {!loading && results.length !== 0 && (
            <div className='flex flex-col mt-5 overflow-x-hidden overflow-y-hidden'>
               <div className='-my-2 overflow-x-auto sm:px-4 sm:-mx-6 lg:px-8'>
                  <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                     <div>
                        <h2 className='mt-5 text-center text-3xl font-bold mb-8 text-gray-900'>
                           All Results
                        </h2>
                     </div>
                     <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                        <table className='min-w-full divide-y divide-gray-300 overflow-x-scroll '>
                           <thead className='bg-indigo-500'>
                              <tr>
                                 <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
                                 >
                                    Name
                                 </th>
                                 <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
                                 >
                                    Address
                                 </th>
                                 <th scope='col' className='relative px-6 py-3'>
                                    <span className='sr-only'>View Result</span>
                                 </th>
                              </tr>
                           </thead>
                           <tbody className='bg-white divide-y divide-gray-200'>
                              {names.map(
                                 (electionName, i) =>
                                    results[i] !== '0x0000000000000000000000000000000000000000' && (
                                       <tr key={i}>
                                          <td className='px-6 py-4 whitespace-nowrap'>
                                             <div className='flex items-center'>
                                                <div className='text-sm font-medium text-gray-900'>
                                                   {names[i]}
                                                </div>
                                             </div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap '>
                                             <div className='text-xs text-gray-900'>
                                                {results[i]}
                                             </div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                             <Link
                                                to={`/results/${results[i]}`}
                                                className='text-indigo-600 hover:text-indigo-900'
                                             >
                                                View Result
                                             </Link>
                                          </td>
                                       </tr>
                                    )
                              )}
                           </tbody>
                        </table>
                     </div>
                     <button className='border border-transparent py-2 mt-5 w-40 rounded-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 '>
                        <Link to='/'> Home Page</Link>
                     </button>
                  </div>
               </div>
            </div>
         )}

         {!loading && results.length === 0 && (
            <h2 className='mt-5 text-center text-3xl font-bold mb-8 text-gray-900'>
               No results Found
            </h2>
         )}

         {loading && <Loading />}
      </>
   );
};
export default AllResults;
