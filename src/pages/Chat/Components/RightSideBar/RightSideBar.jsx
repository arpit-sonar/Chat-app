import { useContext } from 'react';
import './RightSideBar.css'
import { logout } from '../../../../config/firebase';
import { Appcontext } from '../../../../context/AppContext';
import dot from '../../../../assets/green_dot.png';
import avatar from '../../../../assets/avatar_icon.png';

const RightSideBar = () => {

   const {chatUser } = useContext(Appcontext);

  return chatUser? (
    <div className="rs">
        <div className="rs-profile">
            <img src= {avatar} alt="profileimg" />
            <h3>{chatUser.userData.name} {Date.now() - chatUser.userData.lastSeen <= 70000 ? <img src={dot} className='dot' alt="dot" />: null}</h3>
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