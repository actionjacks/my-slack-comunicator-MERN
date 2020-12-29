import React, { useEffect, useState } from "react";
import "../styles/Chat.css";
import { useParams } from "react-router-dom";
import StarsIcon from "@material-ui/icons/Stars";
import HeightIcon from "@material-ui/icons/Height";
import db from "../firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    //get the channel id
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }
    //get the channel content
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails?.name}</strong>
            <StarsIcon />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <HeightIcon /> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {/* chanell content */}
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
};
export default Chat;
