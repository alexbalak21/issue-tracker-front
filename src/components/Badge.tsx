const colorClasses = {
  blue:   "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700",
  green:  "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700",
  red:    "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700",
  yellow: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700",
  purple: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700",
  gray:   "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700",
  orange: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700",
}

interface BadgeProps {
  text?: string
  color?: keyof typeof colorClasses
}

export default function Badge({ text, color = "gray" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium border ${colorClasses[color]}`}
    >
      {text}
    </span>
  )
}
