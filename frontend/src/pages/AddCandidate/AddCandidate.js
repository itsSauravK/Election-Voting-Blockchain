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
import { MdOutlineDriveFileRenameOutline, MdOutlineDescription } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';

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
            <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-16 sm:px-6 lg:px-8'>
               <div className='max-w-md w-full  space-y-8'>
                  <div>
                     <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Add a Candidate
                     </h2>
                  </div>
                  <form className='mt-8 space-y-6' onSubmit={addCandidateHandler}>
                     <div className='rounded-md shadow-sm space-y-4'>
                        {/* Name */}

                        <div>
                           <label
                              htmlFor='name'
                              className='block text-sm font-medium text-gray-700'
                           >
                              Username
                           </label>

                           <div className='mt-1 relative rounded-md shadow-sm'>
                              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                 <MdOutlineDriveFileRenameOutline
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                 />
                              </div>

                              <input
                                 name='name'
                                 id='name'
                                 className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                 value={name}
                                 placeholder="Enter candidate's name"
                                 onChange={(e) => setName(e.target.value)}
                                 required
                              />
                           </div>
                        </div>
                        {/* Description*/}
                        <div>
                           <label
                              htmlFor='description'
                              className='block text-sm font-medium text-gray-700'
                           >
                              Description
                           </label>
                           <div className='mt-1 relative rounded-md shadow-sm'>
                              <div className='absolute mt-2 left-0 pl-3 flex items-center pointer-events-none'>
                                 <MdOutlineDescription
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                 />
                              </div>
                              <textarea
                                 type='text'
                                 rows='10'
                                 name='description'
                                 id='description'
                                 className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                 placeholder="Add candidate's description. Max: 150 characters"
                                 value={description}
                                 onChange={(e) => {
                                    setDescription(e.target.value);
                                 }}
                                 maxLength='150'
                                 required
                              />
                           </div>
                        </div>
                        <div>
                           <label
                              htmlFor='image'
                              className='block text-sm font-medium text-gray-700'
                           >
                              Upload image
                           </label>
                           <div className='mt-1 relative bg-gray-50'>
                              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                 <AiOutlineCloudUpload
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                 />
                              </div>
                              <input
                                 type='file'
                                 onChange={(e) => setPic(e.target.files[0])}
                                 accept='image/png, image/jpeg'
                                 name='image'
                                 id='image'
                                 className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full  pl-10 sm:text-sm'
                                 required
                              />
                           </div>
                        </div>
                     </div>

                     <div>
                        <button
                           type='submit'
                           className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
                        >
                           Add Candidate
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
         {loading && <Loading />}
      </>
   );
};

export default AddCandidate;
