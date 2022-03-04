import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcZH3DBydxx1WbQfP7_A3Lu_qCt94Oev0",
  authDomain: "authentication-63ed1.firebaseapp.com",
  projectId: "authentication-63ed1",
  storageBucket: "authentication-63ed1.appspot.com",
  messagingSenderId: "515651870260",
  appId: "1:515651870260:web:c175bea9d75b9515af7461",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    //À faire. hint: signInWithPopup
    const res = await signInWithPopup(auth, googleProvider);
    //À faire. hint: signInWithPopup
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    //À faire. hint: signInWithEmailAndPassword
    await signInWithEmailAndPassword(auth, email, password);
    //À faire. hint: signInWithEmailAndPassword
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    //À faire. hint: createUserWithEmailAndPassword
    const res = await createUserWithEmailAndPassword(auth, email, password);
    //À faire. hint: createUserWithEmailAndPassword
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    //À faire. hint: sendPasswordResetEmail
    await sendPasswordResetEmail(auth, email);
    //À faire. hint: sendPasswordResetEmail
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
