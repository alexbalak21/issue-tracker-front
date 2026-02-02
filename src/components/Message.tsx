import React from "react";
import { useUser, useUsers } from "../features/user";
import Avatar from "./Avatar";

interface MessageProps {
  id: number;
  senderId: number;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const Message: React.FC<MessageProps> = ({ id, senderId, body, createdAt, updatedAt }) => {
  const { user } = useUser();
  const { users } = useUsers();
  const isCurrentUser = user?.id === senderId;
  const sender = users.find(u => u.id === senderId);
  
  const formattedDate = new Date(createdAt).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {isCurrentUser ? (
            <Avatar name={user.name} imageUrl={user.profileImage} size={32} />
          ) : (
            <Avatar name={sender?.name ?? `User ${senderId}`} size={32} />
          )}
          <span className="text-sm font-semibold text-gray-700">
            {isCurrentUser ? user.name : sender?.name ?? `User ${senderId}`}
          </span>
        </div>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <div className="ml-10 text-gray-800">{body}</div>
    </div>
  );
};

export default Message;
