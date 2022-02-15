import { useEffect, useContext } from 'react';

const AddUser = () => {
   const { user, notify } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      if (!user) {
         notify('You need to login first', 'error');
         navigate('/login');
      } else {
         if (user.role === 'user') {
            notify('You do not have access to this route', 'error');
            navigate('/');
         }
      }
   });
   return (
      <>
         <p>Add user</p>
      </>
   );
};
export default AddUser;
