import {collection, doc, getDoc, getFirestore, query, setDoc, where} from "firebase/firestore";
import {getAuth, sendPasswordResetEmail, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth"; // prebuilt Google function
import { toast } from "react-toastify";
import avatari from '../assets/avatar_icon.png'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export const login = async ( email , password ) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password)

        console.log("Congratulations! , Signup Successfull");
    }catch (error) {
         console.error("SignUp error: ",error.message); 
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export const signup = async (username,email , password ) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth ,email , password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username: username.toLowerCase(),
            email,
            name:"",
            avatar:avatari,
            bio:"Hey, there i am using Chat app",
            lastSeen:Date.now()
        })

        await setDoc(doc(db,"chats",user.uid),{
            chatData:[]
        })

        console.log("Congratulations! , signup Successfull");
    }catch (error) { 
        console.error("signup error: ",error.message); 
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


export const logout = async () => {
    try{
        await signOut(auth);

    }catch(error){
        console.error("signup error: ",error.message);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

export const resetPass = async (email) => {
    if(!email){
        toast.error("Enter your email");
        return null;
    }
    try {
        const userRef = collection(db,'users');
        const q = query(userRef,where("email" , "==",email));
        const querySnap = await getDoc(q);
        if(!querySnap.empty()){
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Sent");
        }else {
            toast.error("Email Doesn't Exists");
        }
    } catch (error) {
        toast.error(error.message);
        console.error(error);
    }
}