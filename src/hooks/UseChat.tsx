import { useState, useCallback, useEffect, useMemo } from 'react';
import { Message } from '../Types/Chat';
import { WebSocketService } from '../services/websocke';

const wsService = new WebSocketService();

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // เชื่อมต่อกับ WebSocket server
    wsService.connect('ws://localhost:8080');

    // ลงทะเบียน handlers
    const messageUnsubscribe = wsService.onMessage((message) => {
      setMessages(prev => [...prev, message]);
    });

    const statusUnsubscribe = wsService.onStatusChange((status) => {
      setIsConnected(status);
    });

    return () => {
      messageUnsubscribe();
      statusUnsubscribe();
      wsService.disconnect();
    };
  }, []);

  const handleSend = useCallback(() => {
    if (newMessage.trim()) {
      wsService.sendMessage({
        text: newMessage,
        sender: 'user'
      });
      setNewMessage('');
    }
  }, [newMessage]);

  const messageCount = useMemo(() => {
    return messages.reduce((acc, curr) => {
      acc[curr.sender] = (acc[curr.sender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [messages]);

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSend,
    messageCount,
    isConnected
  };
};