"use client"

import { useState, useCallback, useMemo } from 'react';
import { Message } from '../Types/Chat';

export const useChat = () => {
  // กำหนดข้อความเริ่มต้นจาก bot
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'สวัสดีจ้า', sender: 'bot' },
    { id: 2, text: 'มีอะไรให้ช่วยไหม?', sender: 'bot' }
  ]);
  // state สำหรับเก็บข้อความที่กำลังพิมพ์
  const [newMessage, setNewMessage] = useState('');

  // ฟังก์ชันสำหรับจัดการการส่งข้อความ
  const handleSend = useCallback(() => {
    if (newMessage.trim()) {
      // สร้างข้อความของผู้ใช้
      const userMessage: Message = {
        id: Date.now(),
        text: newMessage,
        sender: 'user'
      };
      
      // เพิ่มข้อความของผู้ใช้ลงใน messages
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // จำลองการตอบกลับจาก bot หลังจาก 1 วินาที
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: `คุณพิมพ์ว่า: "${newMessage}"`,
          sender: 'bot'
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);
      
      // ล้างข้อความที่พิมพ์
      setNewMessage('');
    }
  }, [newMessage]);

  // คำนวณจำนวนข้อความของแต่ละฝ่าย (user และ bot)
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
    messageCount
  };
};