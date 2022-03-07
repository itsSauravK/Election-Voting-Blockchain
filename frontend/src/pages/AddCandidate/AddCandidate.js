/**
 * @prettier
 */
import axios from 'axios';
import { useContext, useState } from 'react';
import { useUserValidation } from '../../components/hooks/user-validation';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import web3 from '../../ethereum/web3';
import AuthContext from '../../store/auth-context';
import Electioneth from '../../ethereum/election';

const AddCandidate = () => {
   const { election, validAccount, notify } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [pic, setPic] = useState();
   const [link, setLink] = useState('');
   const navigate = useNavigate();
   useUserValidation(true);

   const addCandidateHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (!validAccount) {
         notify('You are using wrong ethereum account', 'error');
         setLoading(false);
         return;
      }
      //cloudinary
      const formData = new FormData();
      formData.append('image', pic);
      const resource = await axios.post('/upload', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      let url = resource.data.file;
      setLink(url);

      //adding data to smart contract
      //name, description, id: image
      const Election = Electioneth(election);
      try {
         const accounts = await web3.eth.getAccounts();
         if (!url) {
            notify('err', 'error');
         }

         await Election.methods.addCandidate(name, description, url).send({
            from: accounts[0],
         });
         notify('Candidate added', 'success');
         navigate('/election');
      } catch (err) {
         notify(err.message, 'error');
      }
      setLoading(false);
   };
   return (
      <>
         {!loading && (
            <form onSubmit={addCandidateHandler}>
               <label>Name</label>
               <br />
               <input value={name} onChange={(e) => setName(e.target.value)} />
               <br />
               <label>Description</label>
               <br />
               <input value={description} onChange={(e) => setDescription(e.target.value)} />
               <br />
               <label>Image</label>
               <br />
               <input
                  type='file'
                  onChange={(e) => setPic(e.target.files[0])}
                  accept='image/png, image/jpeg'
               />
               <br />
               <button type='submit'>Add user</button>
            </form>
         )}
         {loading && <Loading />}
      </>
   );
};

export default AddCandidate;
