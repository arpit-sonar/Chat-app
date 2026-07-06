import React, { useContext, useEffect } from 'react'
import './RightSideBar.css'
import { logout } from '../../../../config/firebase';
import { Appcontext } from '../../../../context/AppContext';
const RightSideBar = () => {

   const {chatUser , messages} = useContext(Appcontext);

  //  useEffect(()=>{
  //   let tempVar =[];
  //   messages.map((msg) =>{
  //     if(msg.image){
  //       te
  //     }
  //   })
  //  },[messages])


  return chatUser? (
    <div className="rs">
        <div className="rs-profile">
            <img src= {chatUser.userData.avatar} alt="profileimg" />
            <h3>{chatUser.userData.name} {Date.now() - chatUser.userData.lastSeen <= 70000 ? <img src="src/assets/green_dot.png" className='dot' alt="dot" />: null}</h3>
            <p>{chatUser.userData.bio}</p>
        </div>
        <hr/>
        <div className="rs-media">
            <p>Media</p>
        </div>
        <button onClick={()=>logout()}>Logout</button>
    </div>
  ):
  <div className="rs">
    <button onClick={()=>logout()}>Logout</button>
  </div>
}

export default RightSideBar;