import React, { useState, useRef } from 'react';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'Hi there!', time: '12:00' },
    { id: 2, user: 'Bob', text: 'Hello! How are you?', time: '12:01' },
  ]);

  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        text: inputValue,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-screen flex flex-col h-screen bg-slate-800">
      <div className="messages flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.user === 'You' ? 'ml-auto' : 'mr-auto'
            } bg-green-100 my-2 rounded-lg shadow-md p-4 flex`}
            style={{ maxWidth: '70%', width: 'fit-content' }}
          >
            <div className="avatar h-6 w-6 rounded-full overflow-hidden self-start">
              <img
                src={`https://ui-avatars.com/api/?name=${message.user}`}
                alt=""
              />
            </div>
            <div className="message-content ml-2">
              <div className="message-header">
                <strong>{message.user}</strong>
              </div>
              <div className="message-text">{message.text}</div>
              <div className={`text-right text-xs`}>{message.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-area p-5 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            ref={inputRef}
            className="w-full focus:outline-none focus:ring-1 ring-green-400 ring-offset-1- px-4 py-1    bg-gray-100 h-16 rounded-lg"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
