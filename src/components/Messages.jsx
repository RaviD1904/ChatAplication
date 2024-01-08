import React, { useContext, useState, useEffect } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firbase";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    //   console.log("doc.data().messages", doc.data().messages);
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);



  return (
    <div className="messages">
      {messages.map((m) => {
       return <Message message={m} key={m.id} />;
      })}   
    </div>
  );
};

export default Messages;
