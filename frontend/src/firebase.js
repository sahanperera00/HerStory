import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {


  apiKey: "AIzaSyCnmu9HRyW7dX9V33neAZuoqiNX5XbfkUA",
  authDomain: "herstory-58c31.firebaseapp.com",
  projectId: "herstory-58c31",
  storageBucket: "herstory-58c31.appspot.com",
  messagingSenderId: "1008289163436",
  appId: "1:1008289163436:web:60d27b71fc8befb85a5709"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
