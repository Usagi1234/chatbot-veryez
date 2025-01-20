import React, { memo } from "react";
import { Message as MessageType } from "../../Types/Chat";

interface MessageProps {
  text: string;
  sender: MessageType["sender"];
}

// ใช้ memo เพื่อป้องกันการ re-render ที่ไม่จำเป็น
export const Message = memo(({ text, sender }: MessageProps) => {
  return (
    <div
      // จัดตำแหน่งข้อความตาม sender (ซ้าย/ขวา)
      className={`flex mb-2 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        // กำหนดสีพื้นหลังและสีข้อความตาม sender
        className={`rounded-lg px-4 py-2 max-w-[70%] break-words ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
});

Message.displayName = 'Message';