import React from 'react';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend }) => {
  // จัดการกดปุ่ม Enter เพื่อส่งข้อความ
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="flex gap-2">
      {/* ช่องกรอกข้อความ */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder="พิมพ์ข้อความ..."
        className="flex-1 px-3 py-2 border rounded-md"
      />
      {/* ปุ่มส่งข้อความ */}
      <button 
        onClick={onSend}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        ส่ง
      </button>
    </div>
  );
};