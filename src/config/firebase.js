// this file is completely responsible for your backend


import {doc, getDoc, getFirestore, query, setDoc} from "firebase/firestore";
import {getAuth, sendPasswordResetEmail, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth"; // prebuilt Google function
import { toast } from "react-toastify";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhS2M91JKj34Ye3ucAgRaSE9hqKTvu8ss",
    authDomain: "chatapp-c5035.firebaseapp.com",
    projectId: "chatapp-c5035",
    storageBucket: "chatapp-c5035.firebasestorage.app",
    messagingSenderId: "434333044330",
    appId: "1:434333044330:web:9e113626e89c404c16c413"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // use firebaseconfig's key to make connection to my project
export const db = getFirestore(app);
export const auth = getAuth(app);



export const login = async ( email , password ) =>{
    try { // safety box
        await signInWithEmailAndPassword(auth,email,password)

        console.log("Congratulations! , Signup Successfull");
    }catch (error) { // if error occurs in try block
         console.error("SignUp error: ",error.message); // error is object firebase gives us , it has info about error
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export const signup = async (username,email , password ) =>{
    try { // safety box
        const res = await createUserWithEmailAndPassword(auth,email , password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username: username.toLowerCase(),
            email,
            name:"",
            avatar:'src/assets/avatar_icon.png',
            bio:"Hey, there i am using Chat app",
            lastSeen:Date.now()
        })

        await setDoc(doc(db,"chats",user.uid),{
            chatData:[]
        })

        console.log("Congratulations! , signup Successfull");
    }catch (error) { // if error occurs in try block
        console.error("signup error: ",error.message); // error is object firebase gives us , it has info about error
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


export const logout = async () => {
    try{
        await signOut(auth);

    }catch(error){
        console.error("signup error: ",error.message); // error is object firebase gives us , it has info about error
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