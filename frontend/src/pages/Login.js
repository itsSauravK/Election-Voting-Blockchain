import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
import  AuthContext  from "../store/auth-context";
const Login = () => {

    const {user, setUser, notify } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading,setLoading] = useState(false);
    //variable to show input otp
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    const sendOTP = async (event) =>{
        event.preventDefault();
        setSent(true);
        setLoading(true);
        try{
                const response = await axios.post('http://localhost:4000/api/election/generateOtp', {
                    email
                })
                notify('OTP has been sent to the email', 'success');
        }catch(err){
            setSent(false);
            notify(err.response.data.errMessage, 'error');
        }
        setLoading(false);
    }

    const loginHandler = async (event) =>{
        event.preventDefault();
        setLoading(true);
        try{
                const response = await axios.post('http://localhost:4000/api/election/login', {
                email,
                otp
            }, {
                withCredentials: true,
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
            })
            notify('Logged in succesfully', 'success');
            setUser(response.data.user);
        }catch(err){
            notify(err.response.data.errMessage, 'error');
        }
        setLoading(false);
    }

    useEffect( () => {
        
        if(user){
            navigate('/');
        }
        
    },[user]);
    return(
        <>
        {!loading&&<form onSubmit={loginHandler}>
            <label>Email</label>
            <input value= {email} onChange={(e) => setEmail(e.target.value)}></input>
            <label>Otp</label>
            {/*sent&&*/(<input value={otp} onChange={(e) => setOtp(e.target.value)}></input>)}
            <button type='button' onClick={sendOTP}>Send OTP</button>
            {/* {sent && */(<button type='submit'>Login</button>)}
        </form>}
        {loading&& <Loading />}
        </>
    );
}
export default Login;