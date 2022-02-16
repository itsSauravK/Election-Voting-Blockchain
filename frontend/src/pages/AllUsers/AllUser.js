import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import ShowUser from './ShowUser';
const AllUser = () => {
   const { user, notify } = useContext(AuthContext);
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   useEffect(() => {
      const b = async () => {
         if (!user) {
            notify('You need to login first', 'error');
            navigate('/login');
         } else {
            if (user.role === 'user') {
               notify('You do not have access to this route', 'error');
               navigate('/');
            } else {
               //get user data
               try {
                  setLoading(true);
                  const response = await axios.get('http://localhost:4000/api/election/allUsers', {
                     withCredentials: true,
                  });
                  console.log(response.data.users);
                  setUsers(response.data.users);
               } catch (err) {
                  notify(err.response.data.errMessage, 'error');
               }
               setLoading(false);
            }
         }
      };
      b();
   }, []);
   return (
      <>
         {loading && <Loading />}
         {!loading &&
            users.length > 0 &&
            users.map((singleUser, element) => (
               <ShowUser key={element} id={singleUser._id} user={singleUser} />
            ))}
         {!loading && users.length === 0 && <p>No user</p>}
         {!loading && users && <p>{users.length} users</p>}
         {!loading && !user.electionOngoing && (
            <button>
               <Link to='/addUser'> Register user</Link>
            </button>
         )}
      </>
   );
};
export default AllUser;
