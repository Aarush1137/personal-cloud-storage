// frontend/src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC3gRWnI-cfXPhpgSS2Xy76ctLKYsWFmnw",
  authDomain: "personalcloudstorage-fd461.firebaseapp.com",
  projectId: "personalcloudstorage-fd461",
  storageBucket: "personalcloudstorage-fd461.appspot.com",
  messagingSenderId: "844766269627",
  appId: "1:844766269627:web:fb27f3c98d2328e6d3d99e",
  measurementId: "G-CDWZ5X5DQP"
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const storage = getStorage(app);

// Export the initialized services for use in your app
export { auth, storage };