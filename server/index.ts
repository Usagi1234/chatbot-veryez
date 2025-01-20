import { WebSocketServer } from 'ws';
import { WebSocketMessage, Message } from '../src/Types/Chat';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // ส่งข้อความต้อนรับ
  const welcomeMessage: Message = {
    id: Date.now(),
    text: 'ยินดีต้อนรับสู่แชท!',
    sender: 'bot',
    timestamp: new Date()
  };

  const wsMessage: WebSocketMessage = {
    type: 'message',
    payload: welcomeMessage
  };

  ws.send(JSON.stringify(wsMessage));

  ws.on('message', (data) => {
    const message: WebSocketMessage = JSON.parse(data.toString());
    
    if (message.type === 'message') {
      // สร้าง ID และ timestamp สำหรับข้อความใหม่
      const newMessage: Message = {
        ...message.payload,
        id: Date.now(),
        timestamp: new Date()
      };

      // ส่งข้อความไปยังทุกคนที่เชื่อมต่อ
      const broadcastMessage: WebSocketMessage = {
        type: 'message',
        payload: newMessage
      };

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(broadcastMessage));
      });

      // จำลองการตอบกลับจาก bot
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now(),
          text: `ได้รับข้อความ: "${newMessage.text}"`,
          sender: 'bot',
          timestamp: new Date()
        };

        const botMessage: WebSocketMessage = {
          type: 'message',
          payload: botResponse
        };

        ws.send(JSON.stringify(botMessage));
      }, 1000);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});