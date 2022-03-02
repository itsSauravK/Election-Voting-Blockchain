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
            <p>
               {user.name} {user.email} {user.role} {user.eAddress}
            </p>
         )}
         {!loading && !user.electionOngoing && (
            <button onClick={deleteUserHandler}>Delete user</button>
         )}
      </>
   );
};
export default ShowUser;
