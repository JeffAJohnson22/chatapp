import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import TopBar from '../TopBar/TopBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'


let socket;

const Chat = ({ location }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');

  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
      const { name, room } = queryString.parse(location.search)

      socket = io(ENDPOINT)

      setName(name);
      setRoom(room);
      console.log(name, room)
      socket.emit('join' , { name, room } , (error) => {
        // if(error) {
        //   alert(error);
        // }
      });

      return () => {
        socket.emit('disconnected', { name, room } );

        socket.off();
      }
  },[ENDPOINT , location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
       
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages])

  const sendMessage = ( e ) => {
      e.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

    console.log(message, messages)

  return (
    <div className='mainContainer'>
      <div className='subContainer'>
      <TopBar room={room}/>
      <Messages messages={messages} name={name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat
