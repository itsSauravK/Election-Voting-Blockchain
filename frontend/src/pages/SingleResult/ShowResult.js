/**
 * @prettier
 */
const ShowResult = ({ candidate, isDraw, id }) => {
   return (
      <tr>
         <td className='px-6 py-4 whitespace-nowrap'>
            <div className='flex items-center'>
               <div className='flex-shrink-0 h-10 w-10'>
                  <img
                     className='h-10 w-10 rounded-full object-cover'
                     src={`${candidate.url}`}
                     alt=''
                  />
               </div>
               <div className='text-sm font-medium text-gray-700 px-2'>{candidate.name}</div>
            </div>
         </td>
         <td className='px-6 py-4 whitespace-nowrap'>
            <div className='text-xs text-gray-900 ml-3'>{candidate.votes}</div>
         </td>
         <td className='px-6 py-4 whitespace-nowrap '>
            <div className='text-xs text-gray-900 ml-3'>{id + 1}</div>
         </td>
         <td className='px-3 py-4 whitespace-nowrap'>
            <span
               className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                  !isDraw ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
               }`}
            >
               {id === 0 && !isDraw && candidate.votes > 0 && <>Winner</>}
               {id === 0 && isDraw && <>Draw</>}
            </span>
         </td>

         {/* <td>{candidate.name}</td>
         <td>{candidate.description}</td>
         <td>{candidate.votes}</td>
         {id === 0 && !isDraw && candidate.votes > 0 && (
            <td>
               <b>Winner</b>
            </td>
         )}
         {isDraw && (
            <td>
               <b>Draw</b>
            </td>
         )} */}
      </tr>
   );
};
export default ShowResult;
