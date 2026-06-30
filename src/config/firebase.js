// this file is completely responsible for your backend


import {getFirestore} from "firestore/firestore"
import {getAuth} from "firestore/auth"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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


import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";

export const signup = async (email , password ) =>{
    try { // safety box
        await createUserWithEmailAndPassword(auth,email,password)

        console.log("Congratulations! , Signup Successfull");
    }catch (error) { // if error occurs in try block

    console.error("SignUp error: ",error.message); // error is object firebase gives us , it has info about error
    }
}

export const login = async (email , password ) =>{
    try { // safety box
        await createUserWithEmailAndPassword(auth,email,password)

        console.log("Congratulations! , login Successfull");
    }catch (error) { // if error occurs in try block

    console.error("login error: ",error.message); // error is object firebase gives us , it has info about error
    }
}

