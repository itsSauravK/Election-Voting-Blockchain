import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
const ShowUser = ({ id, user, setLoading, loading, setUsers }) => {
   const { notify } = useContext(AuthContext);
   const deleteUserHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         //deleting user
         await axios.delete(`/election/delete/${id}`, {
            withCredentials: true,
         });
         //retriving new user list
         const response = await axios.get('/election/allUsers', {
            withCredentials: true,
         });
         setUsers(response.data.users);
         notify('User has been deleted', 'success');
      } catch (err) {
         notify(err.response.date.errMessage, 'error');
      }
      setLoading(false);
   };

   return (
      <>
         {!loading && (
            <tr>
               <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                     <div className=''>
                        <div className='text-sm font-medium text-gray-900'>{user.name}</div>
                        <div className='text-sm text-gray-500'>{user.email}</div>
                     </div>
                  </div>
               </td>
               <td className='px-6 py-4 whitespace-nowrap '>
                  <div className='text-xs text-gray-900'>{user.eAddress}</div>
               </td>
               <td className='px-5 py-4 whitespace-nowrap'>
                  <span
                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                        user.hasVoted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                     }`}
                  >
                     {user.hasVoted && <>Voted</>}
                     {!user.hasVoted && <>Not voted</>}
                  </span>
               </td>
               <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-500'>{user.role}</td>
               {!user.electionOngoing && (
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                     <a onClick={deleteUserHandler} className='text-red-600 hover:text-red-900'>
                        Delete
                     </a>
                  </td>
               )}
            </tr>
         )}
      </>
   );
};
export default ShowUser;
