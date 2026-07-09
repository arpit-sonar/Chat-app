import {Routes , Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import {useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
import { Appcontext } from './context/AppContext';

function App() {
  const navigate = useNavigate();
  const {loadUserData} = useContext(Appcontext);
   
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/chat');
        await loadUserData(user.uid);
      } else {
        navigate('/')
      }
    });
  },[]);


  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path = "/" element = {<Login />}  />  
      <Route path = "/chat" element = {<Chat />}  />
      <Route path = "/profile" element = {<ProfileUpdate />}  />
    </Routes>
    </>
  )  
}

export default App;