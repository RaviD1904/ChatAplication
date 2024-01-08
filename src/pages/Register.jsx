import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firbase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
  const [err, setError] = useState(false);
    const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid),{});
            navigate("/")
          });
        }
      );
    } catch (error) {
      setError(true);
    //   console.log(error.message);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat Application</span>
        <span className="title"> Register</span>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" name="name" />
          <input type="email" placeholder="Enter Email" required name="email" />
          <input
            type="password"
            placeholder="Enter Password"
            required
            name="password"
          />
          <input type="file" />
          <button>Sign up</button>
          {err && <span>Something Went Wrong..</span>}
        </form>
        <p>You Do Have Account <Link to='/login'>SignIn</Link></p>
      </div>
    </div>
  );
};

export default Register;
