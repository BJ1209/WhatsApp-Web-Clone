import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, Mic, Mood, MoreVert, Search } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import "./Chat.css";
import Message from "./Message";
import db from "../config/firebase";
import { useStateValue } from "../Context/StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState(0);
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user }] = useStateValue();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 10000));
  }, [roomId]);
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()?.name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      name: user?.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {messages[0] &&
              new Date(messages[0]?.data?.timestamp?.toDate()).toUTCString().slice(5, 22)}
          </p>
        </div>
        <div className="chat__headerIcons">
          <IconButton>
            <Search className="chat__headerIcon" />
          </IconButton>
          <IconButton>
            <MoreVert className="chat__headerIcon" />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(({ id, data }) => (
          <Message key={id} name={data.name} message={data.message} timestamp={data.timestamp} />
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <Mood className="chat__footerMood" />
        </IconButton>
        <IconButton>
          <AttachFile className="chat__footerAttach" />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button style={{ display: "none" }} onClick={sendMessage} type="submit">
            Send Messege
          </button>
        </form>
        <IconButton>
          <Mic className="chat__footerMic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
