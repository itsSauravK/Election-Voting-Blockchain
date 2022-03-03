import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import AuthContext from '../../store/auth-context';

const EditUser = () => {
   const { user, setUser, notify } = useContext(AuthContext);
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const n = !user ? '' : user.name;
   const e = !user ? '' : user.eAddress;
   const [name, setName] = useState(n);
   const [eAddress, setEAddress] = useState(e);
   useEffect(() => {
      if (!user) {
         notify('Please login first', 'error');
         navigate('/login');
      } else {
         //checking if there is an ongoing election
         if (user.electionOngoing === true) {
            notify('You cannot edit your name and account during election', 'error');
            navigate(-1);
            return;
         }
      }
   }, []);

   const editUserHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const response = await axios.put(
            '/election/edit',
            {
               name,
               eAddress,
            },
            {
               withCredentials: true,
               headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            }
         );
         notify('Your details has been edited', 'success');
         //setting user useStae defined in context
         setUser(response.data.user);
         navigate(-1);
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
      }

      setLoading(false);
   };
   return (
      <>
         {!loading && (
            <form onSubmit={editUserHandler}>
               <label>Name</label>
               <input value={name} onChange={(e) => setName(e.target.value)}></input>
               <label>Ethereum Address</label>
               <input value={eAddress} onChange={(e) => setEAddress(e.target.value)}></input>
               <button type='submit'>Edit User</button>
            </form>
         )}
         {loading && <Loading />}
      </>
   );
};

export default EditUser;
