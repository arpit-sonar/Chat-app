import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../../config/firebase';
import { auth } from "../../config/firebase";
import './Chat.css';
import ChatBox from './Components/ChatBox/ChatBox';
import RightSideBar from './Components/RightSideBar/RightSideBar';
import LeftSideBar from './Components/LeftSideBar/LeftSideBar';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Appcontext } from "../../context/AppContext";
import { toast } from "react-toastify";
// import { ChatWelcome } from "./Components/ChatBox/ChatBox";

const Chat = () => {
  const navigate = useNavigate();

  const { chatData, userData,chatUser } = useContext(Appcontext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (chatData && userData) {
        setLoading(false);
        console.log("here" ,loading );
        toast.success("Success");
        if(!userData.name){
          toast.info("Plase Complete your Profile first.")
          navigate('/profile');
        }
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }, [chatData, userData,navigate])


  // FlexBox
  return (


    <div className="chat">
      {loading ?
        <p className="loading">
          Loading...
        </p> :
        <div className="chat-container">
          <LeftSideBar />
         <ChatBox />
          <RightSideBar />
        </div>
      }
    </div>
  );
};

export default Chat;