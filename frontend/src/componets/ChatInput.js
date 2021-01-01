import React, { useState } from "react";
import "../styles/ChatInput.css";
import { useStateValue } from "../StateProvider";
import axios from "../axios";
import firebase from "firebase";

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();
    //send message to db
    if (channelId) {
      axios.post(`/new/message?id=${channelId}`, {
        message: input,
        timestamp: Date.now(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
    setInput("");
  };
  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
