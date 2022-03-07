/**
 * @prettier
 */
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const Loading = () => {
   return (
      <div className='flex items-center justify-center h-screen text-blue-400'>
         <AiOutlineLoading3Quarters className='h-24 w-24 animate-spin' />
         <span className='sr-only'>Loading...</span>
      </div>
   );
};

export default Loading;
