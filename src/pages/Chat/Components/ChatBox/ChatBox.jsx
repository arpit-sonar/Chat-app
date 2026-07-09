import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import { Appcontext } from '../../../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebase';
const ChatBox = () => {

    const {userData,chatUser,messagesId,messages,setMessages,chatVisible, setChatVisible} = useContext(Appcontext);

    const [input,setInput] = useState("");

    const sendMessage = async () =>{
        try {
            if(input && messagesId){
                await updateDoc(doc(db,'messages',messagesId),{
                    messages:arrayUnion({
                        sId:userData.id,
                        text:input,
                        createdAt:new Date()
                    })
                })

                const userIDs = [chatUser.rId,userData.id];
                userIDs.forEach(async(id)=>{
                    const userChatsRef = doc(db,'chats',id);
                    const userChatsSnap = await getDoc(userChatsRef);
                    if(userChatsSnap.exists()){
                        const userChatData = userChatsSnap.data();
                        const chatIndex = userChatData.chatData.findIndex((c)=>c.messageId === messagesId);
                        userChatData.chatData[chatIndex].lastmessage = input.slice(0,30);
                        userChatData.chatData[chatIndex].updatedAt = Date.now();
                        if(userChatData.chatData[chatIndex].rId === userData.id){
                            userChatData.chatData[chatIndex].meesageSeen = false;

                        }

                        await updateDoc(userChatsRef,{
                            chatData:userChatData.chatsData
                        })
                        
                    }
                })
            }
        } catch (error) { 
            console.error(error);
            toast.error(error.message);
        }
        setInput("");
    }

    const convertTimeStamp = (timestamp)=>{
        let date = timestamp.toDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        if(hour>12){
            return hour-12 + ":" + minute + " PM";
        }else{
            return hour + ":" + minute + " AM";
        }
    }

    useEffect(()=>{
        if(messagesId){
            const unSub= onSnapshot(doc(db,'messages',messagesId),(res)=>{
                setMessages(res.data().messages.reverse())
            })
            return ()=>{
                unSub();
            }
        }
    },[messagesId])

  return chatUser? (
    <div className={`chat-box ${chatVisible? "":"hidden"}`}>
        <div className="chat-user">
            <img src={chatUser.userData.avatar} alt="profileimg" />
            <p>{chatUser.userData.name} {Date.now() - chatUser.userData.lastSeen <= 70000 ? <img src="src/assets/green_dot.png" className='dot' alt="dot" />: null}</p>
            <img src="src/assets/help_icon.png" className= 'help' alt="help" />
            <img onClick={()=>setChatVisible(false)} src="src/assets/arrow_icon.png" className='arrow' alt="" />
        </div>
        <div className="chat-msg">
            {messages.map((msg,index) =>(
            <div key = {index} className={msg.sId === userData.id? "s-msg" :"r-msg"}>
                <p className="msg">{msg.text}</p>
                <div>
                    <img src={msg.sId === userData.id? userData.avatar : chatUser.userData.avatar} alt="img" />
                    <p>{convertTimeStamp(msg.createdAt)}</p>
                </div>
            </div> 
            ))}
        </div>

    <div className="chat-input">
        <input onChange= {(e)=>setInput(e.target.value)} value ={input} type="text" placeholder= 'Send a message' name="" id="" />
        <input type="text" id = 'image' accept = 'image/png , image/jpeg' hidden />
        <label htmlFor="image">
            <img src="src/assets/gallery_icon.png" alt="gallery" />
        </label>
        <img onClick={sendMessage} src="src/assets/send_button.png" alt="send" />
    </div>
    </div>
  ): <div className={`chat-welcome ${chatVisible? "":"hidden"}`}>
    <img src="Blue_logo-png.png" alt="logoicon" />
    <p>Chat anytime, anywhere</p>
  </div>

}

export default ChatBox