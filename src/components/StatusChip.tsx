import React from 'react';
import { getStatusColor } from '../utils/statusColors';

interface StatusChipProps {
  statusId?: number;
  statusName?: string;
}

const StatusChip: React.FC<StatusChipProps> = ({ statusId, statusName }) => {
  const colors = getStatusColor(statusId);

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {statusName || 'Unknown'}
    </span>
  );
};

export default StatusChip;
