import { WebSocketMessage, Message } from "@/Types/Chat";

export class WebSocketService {
    private socket: WebSocket | null = null;
    private messageHandlers: ((message: Message) => void)[] = [];
    private statusHandlers: ((status: boolean) => void)[] = [];
  
    connect(url: string) {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => {
        this.notifyStatusHandlers(true);
      };
  
      this.socket.onclose = () => {
        this.notifyStatusHandlers(false);
        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.connect(url), 5000);
      };
  
      this.socket.onmessage = (event) => {
        const data: WebSocketMessage = JSON.parse(event.data);
        if (data.type === 'message') {
          this.notifyMessageHandlers(data.payload);
        }
      };
    }
  
    sendMessage(message: Omit<Message, 'id' | 'timestamp'>) {
      if (this.socket?.readyState === WebSocket.OPEN) {
        const wsMessage: WebSocketMessage = {
          type: 'message',
          payload: message
        };
        this.socket.send(JSON.stringify(wsMessage));
      }
    }
  
    onMessage(handler: (message: Message) => void) {
      this.messageHandlers.push(handler);
      return () => {
        this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
      };
    }
  
    onStatusChange(handler: (status: boolean) => void) {
      this.statusHandlers.push(handler);
      return () => {
        this.statusHandlers = this.statusHandlers.filter(h => h !== handler);
      };
    }
  
    private notifyMessageHandlers(message: Message) {
      this.messageHandlers.forEach(handler => handler(message));
    }
  
    private notifyStatusHandlers(status: boolean) {
      this.statusHandlers.forEach(handler => handler(status));
    }
  
    disconnect() {
      this.socket?.close();
    }
  }