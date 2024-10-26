// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

    //The initializeApp function is responsible for initializing and configuring your 
    //Firebase application with the settings you provide. It sets up the connection between 
    //your code and Firebase’s backend services, like Firestore, Authentication, Cloud Functions,
    //and others.

import {getAuth, GoogleAuthProvider} from "firebase/auth"

   //For authentication (using Google for this instance)

import { getFirestore } from "firebase/firestore";
    
    //The getFirestore function is used to get an instance of Firestore in your Firebase application.
    //This instance provides the necessary methods and properties to interact with Firestore, allowing 
    //you to perform database operations such as adding, reading, updating, and deleting documents.


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB2caI-17aiOyMazlK2dgNOj6gnNUfR1H4",
  authDomain: "forumsite-e375a.firebaseapp.com",
  projectId: "forumsite-e375a",
  storageBucket: "forumsite-e375a.appspot.com",
  messagingSenderId: "81880161742",
  appId: "1:81880161742:web:a9006381dbad7c71efdf9f"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
    // What is this "app" : The app variable is an instance of your Firebase application created
    //by the initializeApp function.

    //Purpose: Serves as the entry point for interacting with all the Firebase services
    //associated w your project, including Firestore, Authentication, Cloud Storage, and others.



export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)

    // What is this "db": The db variable is an instance of Firestore that you get by calling getFiresotre(app).

    //Purpose: Provides methods and properties to interact specifically with Firestore.
    //Such as adding, retrieving, updating, and deleting documents in your Firestore database.