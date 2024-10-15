import React, { useEffect, useState, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Adjust the port as needed

const ChatRoom = () => {
  const { messages, sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    sendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('message', (msg) => {
      // Handle incoming messages
    });

    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatRoom;
