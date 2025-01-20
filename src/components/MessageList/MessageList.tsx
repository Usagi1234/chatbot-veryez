import React from 'react';
import { Message } from '../Message/Message';
import { Message as MessageType } from '../../Types/Chat';

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="h-[400px] mb-4 p-2 overflow-y-auto">
      {messages.map(message => (
        <Message 
          key={message.id}
          text={message.text}
          sender={message.sender}
        />
      ))}
    </div>
  );
};