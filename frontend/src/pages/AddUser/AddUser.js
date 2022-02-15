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
      }
   });

   const userRegisterHandler = (e) => {
      e.preventDefault();
      console.log('click');
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
