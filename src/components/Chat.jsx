import React, { useContext } from "react";
import Add from "../images/add-user.png";
import video from "../images/video.png";
import more from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>
          <img
            src={data.user.photoURL}
            alt="user avatar"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
            }}
          />
        </span>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={video} alt="video" />
          <img src={Add} alt="add" />
          <img src={more} alt="more" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
