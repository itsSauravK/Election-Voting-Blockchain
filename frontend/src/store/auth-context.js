/**
 * @prettier
 */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import React from 'react';
import Loading from '../components/Loading';
import factory from '../ethereum/factory';

const AuthContext = React.createContext({
   user: {}, //get user
   election: '', //get election address
   loading: false, //check if its loading
   validAccount: false, //check if user is using correct ethereum account
   setUser: () => {}, //changes user value
   notify: () => {}, //for snackbar
   getAccount: () => {}, //to change valid account value
   setElection: () => {}, // to change election address
   results: [], //to store all election results address, so if user
   //directly goes to /results/address, we have data to compare if its not a fake address
   setResults: () => {}, //to change election results
   names: [], //Store all election names
   setNames: () => {},
});

export const AuthContextProvider = (props) => {
   const [results, setResults] = useState([]);
   const [user, setUser] = useState();
   const [loading, setLoading] = useState(false);
   const [validAccount, setValidAccount] = useState(false);
   const [election, setElection] = useState('0x0000000000000000000000000000000000000000');
   const [names, setNames] = useState([]);
   //whenever user changes ethereum account, this function runs
   window.ethereum &&
      window.ethereum.on('accountsChanged', function (accounts) {
         getAccount();
      });

   //To get intial address of all previous elections
   //useGetResults(setLoading);
   //to check if metamask is installed
   useEffect(() => {
      const c = async () => {
         if (!window.ethereum) {
            alert('Please Intall metamask');
            window.location.href = 'https://metamask.io/';
         }
      };
      c();
      return () => c;
   });
   //to set setValidAccount value
   // useEffect(() => {
   //    getAccount();
   // }, []);
   //function to make sure user is using correct ethereum account
   async function getAccount() {
      setLoading(false);
      //getting current account
      try {
         const accounts = await window.ethereum.enable();
         if (user) {
            //accounts = await web3.eth.getAccounts()

            if (accounts[0] && user.eAddress)
               setValidAccount(accounts[0].toUpperCase() === user.eAddress.toUpperCase());
         }
      } catch (err) {
         alert('Login metamask');
         window.location.href = 'https://metamask.io/';
      }
   }
   //this use effect is to get user data from http cookie
   useEffect(() => {
      const b = async () => {
         setLoading(true);
         try {
            const response = await axios.get('/election/getUser', {
               withCredentials: true,
            });
            setUser(response.data.user);
         } catch (err) {}

         // const accounts = await web3.eth.getAccounts();
         // account = accounts[0]
      };
      b();
      setLoading(false);
      return () => b;
   }, [setUser]);

   // this use effect is to get deployed election
   useEffect(() => {
      const getAddress = async () => {
         setLoading(true);
         let address;
         try {
            address = await factory.methods.deployedElection().call();
            setElection(address);
         } catch (err) {
            notify(err, 'error');
         }
         setLoading(false);
      };
      getAddress();
      return () => getAddress;
   }, []);

   //react notifier
   const notify = (message, status) => {
      switch (status) {
         case 'error':
            toast.error(message, {
               autoClose: 3000,
               position: toast.POSITION.BOTTOM_RIGHT,
            });
            break;

         case 'success':
            toast.success(message, {
               autoClose: 3000,
               position: toast.POSITION.BOTTOM_RIGHT,
            });
            break;
      }
   };
   return (
      <>
         {!loading && (
            <AuthContext.Provider
               value={{
                  user: user,
                  setUser: setUser,
                  notify: notify,
                  getAccount: getAccount,
                  election: election,
                  loading: loading,
                  validAccount: validAccount,
                  setElection: setElection,
                  results,
                  setResults,
                  names,
                  setNames,
               }}
            >
               {props.children}
            </AuthContext.Provider>
         )}
         {loading && <Loading />}
      </>
   );
};

export default AuthContext;
