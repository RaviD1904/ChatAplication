import React, { useContext, useState } from "react";
import Attach from "../images/attach.png";
import Add from "../images/add-image.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firbase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      // with image
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //   setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } 
    else {
      //for text only
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId + ".lastMessage"]:{
            text
        },
        [data.chatId + ".date"]:serverTimestamp()

    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId+".lastMessage"]:{
            text
        },
        [data.chatId+".date"]:serverTimestamp()

    })

    setImg(null)
    setText("")
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type Messege..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="attach" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          
        />
        <label htmlFor="file">
          <img src={Add} alt="add" />
        </label>

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
