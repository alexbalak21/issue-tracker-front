import React from 'react';

interface AssignedChipProps {
  userId?: number | null;
  userName?: string;
}

const AssignedChip: React.FC<AssignedChipProps> = ({ userId, userName }) => {
  const isUnassigned = !userId;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
        isUnassigned
          ? 'bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600'
          : 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700'
      }`}
    >
      {isUnassigned ? 'Unassigned' : userName || `User #${userId}`}
    </span>
  );
};

export default AssignedChip;
