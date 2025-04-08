import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYQ70HqayWUHyYl5hcPrPqoUi9H0-qjNM",
  authDomain: "doctoo-24ed9.firebaseapp.com",
  projectId: "doctoo-24ed9",
  storageBucket: "doctoo-24ed9.firebasestorage.app",
  messagingSenderId: "1070182673202",
  appId: "1:1070182673202:web:018c6775b9614055f4052b",
  measurementId: "G-KL4HNEYSR7",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
