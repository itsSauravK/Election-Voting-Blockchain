import { useState, useEffect } from "react";
import axios from 'axios';
import {toast} from 'react-toastify'
import React from 'react'
import Loading from "../components/Loading";
import factory from '../ethereum/factory'
import web3 from "../ethereum/web3";
const AuthContext = React.createContext({
    user : {}, //get user
    election : '', //get election address
    loading: false, //check if its loading
    validAccount: false, //check if user is using correct ethereum account
    setUser: () => {}, //changes user value
    notify:() => {}, //for snackbar
    getAccount: () =>{}, //to change valid account value
    setElection: () => {} // to change election address
})

export const AuthContextProvider = (props) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [validAccount, setValidAccount] = useState(false);
    const [election, setElection] = useState('0x0000000000000000000000000000000000000000');
    
    //whenever user changes ethereum account, this function runs
    window.ethereum.on('accountsChanged', function (accounts) {
        
        getAccount();
  })

  //function to make sure user is using correct ethereum account
  async function getAccount() {
      //getting current account
    const accounts = await window.ethereum.enable();
    if(user){
      //accounts = await web3.eth.getAccounts();
      setValidAccount(accounts[0].toUpperCase() === user.eAddress.toUpperCase()) 
    }

  }
  //this use effect is to get user data from http cookie
    useEffect( ()=> {
       
        (async () => {
            setLoading(true);
            try{
            const response = await axios.get('http://localhost:4000/api/election/getUser',{
                withCredentials: true,
            });
            setUser(response.data.user);
            }
            catch(err){

            }
            
                // const accounts = await web3.eth.getAccounts();
                // account = accounts[0]
              
        })()
        
        setLoading(false);
        }, [setUser])

    //this use effect is to get deployed election
    useEffect( () => { 
        const getAddress = async() => {
            setLoading(true);
            let address = await factory.methods.deployedElection().call()
            setElection(address);
            console.log(election);
            setLoading(false);
        }
        getAddress();
    },[])

    //react notifier
    const notify = (message, status) => {

            switch(status){
            case 'error': 
            toast.error(message,{
                autoClose:3000,
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            break;

            case 'success':
            toast.success(message, {
                autoClose:3000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            break;


            };
    }  
      return(
      <>
        {!loading&&<AuthContext.Provider
            value={{
                user: user,
                setUser: setUser,
                notify: notify,
                election: election,
                loading: loading,
                validAccount: validAccount,
                getAccount: getAccount,
                setElection: setElection
            }} >
                {props.children}
        </AuthContext.Provider>}
        {loading && <Loading />}
      </>
    )
}

export default AuthContext;