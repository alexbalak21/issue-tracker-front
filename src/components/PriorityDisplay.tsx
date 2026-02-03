import clsx from "clsx";
import { priorityDotColors } from "../utils/priorityDotColors";

type PriorityDisplayProps = {
  priorityId: number;
  priorityName: string;
  className?: string;
};

export function PriorityDisplay({
  priorityId,
  priorityName,
  className,
}: PriorityDisplayProps) {
  const color =
    priorityDotColors[priorityId as 1 | 2 | 3 | 4] ??
    priorityDotColors[1];

  return (
    <div
      className={clsx(
        "relative block ps-4 rounded-lg bg-white text-gray-900 outline outline-gray-300 text-left whitespace-nowrap",
        "dark:bg-gray-800 dark:text-white dark:outline-gray-700",
        className
      )}
    >
      <span className="inline-flex items-center gap-2">
        <span className={`w-3 h-3 rounded-sm ${color.bg}`} />
        {priorityName}
      </span>
    </div>
  );
}
