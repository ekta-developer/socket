import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [room,setRoom]= useState("");
  const [message, setMessage]= useState("");
  const [messageReceived, setMessageReceived]= useState("");

  const joinRoom=()=>{
    if(room !== ""){
      socket.emit("join_room", room);
    }
  }
//HERE, WE PASS ROOM ALSO TO SEND MESSAGE TO SPECIFIC ROOM ONLY
  const sendMessage = () => {
    socket.emit("send_message", { message, room});
  };

  //USEEFFECT RUNS MULTIPLE TIMES AS THE SOCKET RECEIVES NEW MESSAGE
  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input placeholder="Room Number ..." onChange={(e)=>{setRoom(e.target.value);}}></input>
      <button onClick={joinRoom}>Join Room</button>
      <br></br>
      <input placeholder="Message..." onChange={(e)=>{setMessage(e.target.value)}}></input>
      <button onClick={sendMessage}>Send Message</button>
      <br></br>
      <h1>Message</h1>
      {messageReceived}
    </div>
  );
}

export default App;
