import React, { useEffect, useState } from "react";
import "../styles/Chat.css";
import { useParams } from "react-router-dom";
import StarsIcon from "@material-ui/icons/Stars";
import HeightIcon from "@material-ui/icons/Height";
import Message from "./Message";
import ChatInput from "./ChatInput";
import axios from "../axios";
import Pusher from "pusher-js";
const pusher = new Pusher("fa30cbf3764319fd01dd", {
  cluster: "eu",
});

const Chat = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  const getConvo = () => {
    axios.get(`/get/conversation?id=${roomId}`).then((res) => {
      setRoomDetails(res.data[0]?.channelName);
      setRoomMessages(res.data[0]?.conversation);
    });
  };

  useEffect(() => {
    //get the channel id
    if (roomId) {
      getConvo();

      const channel = pusher.subscribe("conversation");
      channel.bind("newMessage", function (data) {
        getConvo();
      });
    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails}</strong>
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
      <ChatInput channelName={roomDetails} channelId={roomId} />
    </div>
  );
};
export default Chat;
