/**
 * @prettier
 */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import AuthContext from '../../store/auth-context';
import Loading from '../../components/Loading';
import { useEndElection } from '../../components/hooks/end-election';

const LandingPage = () => {
   const [loading, setLoading] = useState(false);
   const { user, notify, election } = useContext(AuthContext);
   // useEffect(() => {
   //    if (!user) {
   //       notify("Please login first", "error");
   //       //navigate('/login');
   //    }
   // }, [user]);

   //use effect to remove bug where user rejects second transaction while ending election
   useEndElection('', setLoading);

   return (
      <>
         {/* No user */}
         {!loading && !user && (
            <Link to='/login'>
               <button>Login</button>
            </Link>
         )}

         {/*User and election ongoing */}
         {!loading && user && user.electionOngoing && (
            <Link to='/election'>
               <button>Vote now</button>
            </Link>
         )}

         {/* User role and no election ongoing */}
         {!loading && user && user.role === 'user' && !user.electionOngoing && (
            <p>No election ongoing</p>
         )}

         {/* Admin role and no election ongoing */}
         {!loading &&
            user &&
            user.role === 'admin' &&
            !user.electionOngoing &&
            election === '0x0000000000000000000000000000000000000000' && (
               <Link to='/addElection'>
                  <button>Start Election</button>
               </Link>
            )}

         {/*Admin role and added an election but did not start it*/}
         {!loading &&
            user &&
            user.role === 'admin' &&
            !user.electionOngoing &&
            election !== '0x0000000000000000000000000000000000000000' && (
               <Link to='/election'>
                  <button>Go to Election</button>
               </Link>
            )}

         {loading && <Loading />}

         {!!election && <p>wrwr</p>}
         <p className='text-lg'>Landing page</p>
      </>
   );
};

export default LandingPage;
