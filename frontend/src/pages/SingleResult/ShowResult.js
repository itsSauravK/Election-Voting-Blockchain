/**
 * @prettier
 */
const ShowResult = ({ candidate, isDraw, id }) => {
   return (
      <div className='flex justify-start mt-5 mx-5 mb-3'>
         <div
            className={`flex filter  flex-col lg:flex-row rounded-lg  ${
               id === 0 && !isDraw && candidate.votes > 0
                  ? 'bg-winner drop-shadow-3xl shadow-card'
                  : 'bg-gray-200 drop-shadow-md shadow-xl'
            } ${id === 0 && isDraw && 'bg-indigo-200 drop-shadow-xl shadow-xl'}`}
         >
            <div className='my-auto mx-auto items-center justify-center pl-2 '>
               <img
                  className='mt-3 max-w-lg lg:h-20 lg:w-20 md:h-16 md:w-16 w-32 h-32 rounded-full object-cover'
                  src={`${candidate.url}`}
               />
               <h5 className='text-gray-900 lg:text-lg md:text-md text-center font-medium mb-2'>
                  {candidate.name}
               </h5>
            </div>

            <div className='py-4 px-2 flex flex-col justify-start md:max-w-l lg:max-w-md'>
               <p className='text-gray-700 mb-4 text-sm'>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
                  eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p
               </p>
               <div className='inline-flex'>
                  <p
                     className={`${!isDraw && id === 0 && 'text-indigo-700'} ${
                        isDraw && id === 0 && 'text-indigo-900'
                     } ${id !== 0 && 'text-black'}
                      text-lg bold`}
                  >
                     Votes:{candidate.votes}
                  </p>
                  {id === 0 && !isDraw && candidate.votes > 0 && (
                     <p className='flex text-indigo-700 text-lg bold ml-auto pr-4'>Winner</p>
                  )}
                  {id === 0 && isDraw && (
                     <p className='flex text-indigo-900 text-lg bold ml-auto pr-4'>Draw</p>
                  )}
               </div>
            </div>
         </div>
      </div>
      // <tr>
      //    <td className='px-6 py-4 whitespace-nowrap'>
      //       <div className='flex items-center'>
      //          <div className='flex-shrink-0 h-10 w-10'>
      //             <img
      //                className='h-10 w-10 rounded-full object-cover'
      //                src={`${candidate.url}`}
      //                alt=''
      //             />
      //          </div>
      //          <div className='text-sm font-medium text-gray-700 px-2'>{candidate.name}</div>
      //       </div>
      //    </td>
      //    <td className='px-6 py-4 whitespace-nowrap'>
      //       <div className='text-xs text-gray-900 ml-3'>{candidate.votes}</div>
      //    </td>
      //    <td className='px-6 py-4 whitespace-nowrap '>
      //       <div className='text-xs text-gray-900 ml-3'>{id + 1}</div>
      //    </td>
      //    <td className='px-3 py-4 whitespace-nowrap'>
      //       <span
      //          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
      //             !isDraw ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
      //          }`}
      //       >
      //          {id === 0 && !isDraw && candidate.votes > 0 && <>Winner</>}
      //          {id === 0 && isDraw && <>Draw</>}
      //       </span>
      //    </td>

      //{/* <td>{candidate.name}</td>
      // <td>{candidate.description}</td>
      // <td>{candidate.votes}</td>
      // {id === 0 && !isDraw && candidate.votes > 0 && (
      //    <td>
      //       <b>Winner</b>
      //    </td>
      // )}
      // {isDraw && (
      //    <td>
      //       <b>Draw</b>
      //    </td>
      // )} */}
      // </tr>
   );
};
export default ShowResult;
