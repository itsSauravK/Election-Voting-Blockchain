import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../store/auth-context';
const AllUser = () => {
   const { user, notify } = useContext(AuthContext);
   const [users, setUsers] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   useEffect(() => {
      if (!user) {
         notify('You need to login first', 'error');
         navigate('/login');
      } else {
         if (user.role === 'user') {
            notify('You do not access to this route', 'error');
            navigate('/');
         } else {
            //get user data
            try {
               const response = axios.get('http://localhost:4000/api/election/allUsers');
            } catch (err) {}
         }
      }
   });
   return (
      <>
         <p>All users</p>
      </>
   );
};
export default AllUser;
