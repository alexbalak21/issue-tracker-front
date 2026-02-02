export const statusColors: Record<number, { bg: string; text: string; border: string }> = {
  1: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-300 dark:border-blue-700",
  },
  2: {
    bg: "bg-purple-100 dark:bg-purple-900",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-purple-300 dark:border-purple-700",
  },
  3: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-800 dark:text-gray-200",
    border: "border-gray-300 dark:border-gray-600",
  },
  4: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-300 dark:border-green-700",
  },
};

export function getStatusColor(statusId?: number) {
  if (!statusId || !statusColors[statusId]) {
    return statusColors[1];
  }
  return statusColors[statusId];
}
