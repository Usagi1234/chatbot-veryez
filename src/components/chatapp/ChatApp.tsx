"use client"
import React from 'react';
import { MessageList } from '../MessageList/MessageList';
import { MessageInput } from '../MessageInput/MessageInput';
import { useChat } from '../../hooks/UseChat';

export const ChatApp: React.FC = () => {
  const { 
    messages, 
    newMessage, 
    setNewMessage, 
    handleSend, 
    messageCount 
  } = useChat();

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-2 text-sm text-gray-500">
        Messages: User ({messageCount.user || 0}), Bot ({messageCount.bot || 0})
      </div>
      
      <MessageList messages={messages} />
      
      <MessageInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSend={handleSend}
      />
    </div>
  );
}