import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firbase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
const navigate=useNavigate()
const {currentUser} = useContext(AuthContext)

    const handleLogout=()=>{
            signOut(auth)
            navigate("login")
    }
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt="avatar"
        />
        <span>{currentUser.displayName}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
