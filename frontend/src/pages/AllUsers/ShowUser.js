const ShowUser = ({ id, user }) => {
   return (
      <>
         <p>
            {user.name} {user.email} {user.role} {user.eAddress}
         </p>
      </>
   );
};
export default ShowUser;
