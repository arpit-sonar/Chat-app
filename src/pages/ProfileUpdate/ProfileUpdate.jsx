import React, { useContext, useEffect, useState } from 'react';
import './ProfileUpdate.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Appcontext } from '../../context/AppContext';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {

    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [bio,setBio] = useState("");
    const [uid,setUid] = useState("");
    const {setUserData} = useContext(Appcontext);
    const [loading,setLoading] = useState(false);
     
    const profileupdate = async (e) =>{
        e.preventDefault();
        setLoading(true);
        try {
            const docRef = doc(db,"users",uid);
            await updateDoc(docRef,{
                bio:bio,
                name:name
            })
            const snap = await getDoc(docRef);
            setUserData(snap.data());
            toast.success("Profile Data Saved Succesfully");
            navigate('/chat');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) =>{
            try {
                if(user){
                    setUid(user.uid);
                    const docRef = doc(db,"users",user.uid);
                    const docSnap = await getDoc(docRef);
                    if(docSnap.data().name){
                        setName(docSnap.data().name);
                    }
                    if(docSnap.data().bio){
                        setBio(docSnap.data().bio);
                    }
                    
                }else{
                    navigate('/');
                }
                
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        })
    },[])



    return (
        <div className="profile">
            <div className="profile-container">
                <form onSubmit={profileupdate} className="profile-form">
                    <h3>Profile Details</h3>
                    <label htmlFor="avatar">
                        <input onChange= {(e) =>setImage(e.target.files[0])} type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
                        <img src={'src/assets/avatar_icon.png'} alt="Avatar Upload" />
                        Upload Profile Image
                    </label>
                    <input  onChange={(e)=>setName(e.target.value)}  value ={name} type="text" placeholder="Your name" required />
                    <textarea onChange= {(e) =>setBio(e.target.value)} value = {bio} placeholder="Write profile bio" required></textarea>
                    <button type="submit" disabled= {loading} >
                        {loading? "Saving..." : "Save"}
                    </button>
                </form>
                <img className="profile-pic" src="Blue_logo-png.png" alt="Profile" />
            </div>
        </div>
    );
};

export default ProfileUpdate;