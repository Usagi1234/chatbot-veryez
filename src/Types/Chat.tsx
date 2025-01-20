export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface WebSocketMessage {
  type: 'message' | 'connection' | 'typing';
  payload: any;
}
