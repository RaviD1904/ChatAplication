import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firbase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    // const q = query(collection(db, "cities"), where("capital", "==", true));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
        // console.log(doc.data());
      });
    } catch (error) {
      setErr(true);
      alert(error.message);
    }
  };

  const handleKey = (e) => {
    e.key == "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    //create user chat

    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          onKeyDown={handleKey}
          placeholder="find a user"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User Not Found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user?.photoURL} />
          <div className="userChatInfo">
            <span>{user?.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
