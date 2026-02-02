import React from "react";
import { priorityDotColors } from "../utils/priorityDotColors";

type PriorityChipProps = {
  priorityId?: number;
  priorityName?: string;
};

function getPriorityColor(priorityId?: number) {
  if (!priorityId || !priorityDotColors[priorityId as keyof typeof priorityDotColors]) {
    return priorityDotColors[1];
  }
  return priorityDotColors[priorityId as keyof typeof priorityDotColors];
}

export const PriorityChip: React.FC<PriorityChipProps> = ({
  priorityId,
  priorityName,
}) => {
  const colors = getPriorityColor(priorityId);

  return (
    <span className="inline-flex items-center gap-2 px-2 rounded border border-gray-300 font-medium">
      <span className={`w-4 h-4 rounded-sm ${colors.bg}`}></span>
      {priorityName || 'Unknown'}
    </span>
  );
};
