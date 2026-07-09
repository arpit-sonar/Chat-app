import { useState } from 'react'
import { login, signup ,resetPass} from '../../config/firebase'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [UserName, setUserName] = useState('');
    const [curState, setCurState] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (curState) {
                await signup(UserName,email, password);
            } else {
                await login(email, password);
            }
            navigate('/chat');
            console.log("Succesfully login");
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    return (
        <div className='login'>
            <img src="SyncChat_logo.png" alt="Logo" className="logo" />
            
            <form onSubmit={handleSubmit} className='login-form'>
                <h2>{curState ? "Sign up" : "Login"}</h2>
                
                {curState ? 
                    <input 
                        className="form-input"
                        type="text" 
                        placeholder="username"
                        value={UserName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        autoComplete='off'
                    /> 
                : null}
                
                <input 
                    className="form-input"
                    type="email" 
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete='off'
                />
                
                <input 
                    className="form-input"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete='off'
                />
                
                <button type="submit" className="submit-btn">
                    {curState ? "Create account" : "Login now"}
                </button>

                <div className='login-forgot'>
                    {curState ? 
                        <p className='login-toggle'>Already have an account <span onClick={() => setCurState(false)}>Login here</span></p>
                        : 
                        <p className='login-toggle'>Create an account <span onClick={() => setCurState(true)}>Click here</span></p>
                    }
                    {!curState ?<p className='login-toggle'>Forgot Password<span onClick={() => resetPass(email)}> reset here</span></p>:null}
                </div>
            </form>
        </div>
    )
}

export default Login;