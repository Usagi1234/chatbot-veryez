import React from 'react';
import { ChatApp } from '../components/chatapp/ChatApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          แชทแอพพลิเคชั่น
        </h1>
        <ChatApp />
      </div>
    </div>
  );
}

export default App;