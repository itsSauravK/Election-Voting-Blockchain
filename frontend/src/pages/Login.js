/**
 * @prettier
 */
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router';
import AuthContext from '../store/auth-context';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
const Login = () => {
   const { user, setUser, notify } = useContext(AuthContext);
   const [email, setEmail] = useState('');
   const [otp, setOtp] = useState('');
   const [loading, setLoading] = useState(false);
   const [disable, setDisable] = useState(false);
   const [seconds, setSeconds] = useState(15);
   //variable to show otp input and button
   const [sent, setSent] = useState(false);
   const navigate = useNavigate();
   let interval = null;
   const sendOTP = async (event) => {
      event.preventDefault();
      if (email.trim().length === 0) {
         notify('Enter an email please', 'error');
         return;
      }
      clearInterval(interval);
      setSent(true);
      setLoading(true);

      interval = null;
      setSeconds(15);
      //sending OTP
      try {
         await axios.post('/election/generateOtp', {
            email,
         });
         notify('OTP has been sent to the email', 'success');
         setDisable(true);
         interval = setInterval(() => {
            if (seconds > 0) {
               setSeconds((seconds) => seconds > 0 && seconds - 1);
            } else {
               console.log('clear interval');
               clearInterval(interval);
            }
         }, 1000);
         setSeconds(15);
      } catch (err) {
         setSent(false);
         notify(err.response.data.errMessage, 'error');
      }
      setLoading(false);
   };
   //logging in account
   const loginHandler = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
         const response = await axios.post(
            '/election/login',
            {
               email,
               otp,
            },
            {
               withCredentials: true,
               headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            }
         );
         notify('Logged in succesfully', 'success');
         //setting user useStae defined in context
         setUser(response.data.user);
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
      }
      setLoading(false);
   };

   useEffect(() => {
      if (user) {
         navigate('/');
      }
      !(seconds > 0) && setDisable(false);
   });
   return (
      <>
         {!loading && (
            <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-16 sm:px-6 lg:px-8'>
               <div className='max-w-md w-full  space-y-8'>
                  <div>
                     <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Login
                     </h2>
                  </div>
                  <form className='mt-8 space-y-6' onSubmit={loginHandler}>
                     <div className='rounded-md shadow-sm space-y-4'>
                        {/* Email */}
                        <div>
                           <label
                              htmlFor='email'
                              className='block text-sm font-medium text-gray-700'
                           >
                              Email
                           </label>
                           <div className='mt-1 relative rounded-md shadow-sm'>
                              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                 <AiOutlineMail
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                 />
                              </div>
                              <input
                                 type='email'
                                 name='email'
                                 id='email'
                                 className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                 placeholder='you@example.com'
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 required
                              />
                           </div>
                        </div>

                        {/* OTP */}
                        {sent && (
                           <div>
                              <label
                                 htmlFor='OTP'
                                 className='block text-sm font-medium text-gray-700'
                              >
                                 OTP
                              </label>

                              <div className='mt-1 relative rounded-md shadow-sm'>
                                 <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <AiFillLock
                                       className='h-5 w-5 text-gray-400'
                                       aria-hidden='true'
                                    />
                                 </div>

                                 <input
                                    name='otp'
                                    id='otp'
                                    className='focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                 />
                                 {disable && (
                                    <div className='fixed text-xs text-gray-500'>
                                       Can send OTP again in : {seconds}
                                    </div>
                                 )}
                              </div>
                           </div>
                        )}
                     </div>
                     {sent && (
                        <div>
                           <button
                              type='submit'
                              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
                           >
                              Sign In
                           </button>
                        </div>
                     )}
                     {!disable && (
                        <div>
                           <button
                              type='button'
                              onClick={sendOTP}
                              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 '
                           >
                              Send OTP
                           </button>
                        </div>
                     )}
                  </form>
               </div>
            </div>
         )}

         {loading && <Loading />}
      </>
   );
};
export default Login;
