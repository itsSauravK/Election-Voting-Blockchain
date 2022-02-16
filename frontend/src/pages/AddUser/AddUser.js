import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../store/auth-context';

const AddUser = () => {
   const { user, notify } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [eAddress, setEAddress] = useState('');

   useEffect(() => {
      if (!user) {
         notify('You need to login first', 'error');
         navigate('/login');
      } else {
         if (user.role === 'user') {
            notify('You do not have access to this route', 'error');
            navigate('/');
         }
         if (user.role === 'admin' && user.electionOngoing) {
            notify('You cannot register a user after starting an election');
            navigate('/');
         }
      }
   });

   const userRegisterHandler = async (e) => {
      e.preventDefault();
      try {
         setLoading(true);
         await axios.post(
            'http://localhost:4000/api/election/register',
            {
               name,
               email,
               eAddress,
            },
            {
               withCredentials: true,
            }
         );
         notify('User has been registered', 'success');
         navigate('/users');
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
      }
      setLoading(false);
   };
   return (
      <>
         <p>Add user</p>
         <form onSubmit={userRegisterHandler}>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
            />
            <label>Ethereum Address</label>
            <input
               value={eAddress}
               onChange={(e) => {
                  setEAddress(e.target.value);
               }}
            />
            <button type='submit'>Register</button>
         </form>
      </>
   );
};
export default AddUser;
