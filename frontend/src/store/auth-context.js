import { useState, useEffect } from "react";
import axios from 'axios';
import {toast} from 'react-toastify'
import React from 'react'
import Loading from "../components/Loading";
const AuthContext = React.createContext({
    user : {},
    setUser: () => {},
    notify:() => {}
})

export const AuthContextProvider = (props) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    
    useEffect( ()=> {
        console.log('useEffect');
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
            
        })()
        setLoading(false);
        }, [setUser])

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
                notify: notify
            }} >
                {props.children}
        </AuthContext.Provider>}
        {loading && <Loading />}
      </>
    )
}

export default AuthContext;