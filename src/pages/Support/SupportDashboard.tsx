export default function SupportDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor queues, prioritize tickets, and keep response times low.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
            Assign Next Ticket
          </button>
          <button className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
            View SLA Report
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {label: "Open Tickets", value: "42"},
          {label: "High Priority", value: "7"},
          {label: "Avg. Response", value: "1h 12m"},
          {label: "Resolved Today", value: "18"},
        ].map(item => (
          <div
            key={item.label}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
          <h2 className="text-lg font-semibold">Queue Overview</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-center justify-between">
              <span>Unassigned</span>
              <span className="font-medium">12</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Assigned to you</span>
              <span className="font-medium">5</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Awaiting customer</span>
              <span className="font-medium">9</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Due in next 24h</span>
              <span className="font-medium">6</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 space-y-2">
            <button className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
              Create Internal Note
            </button>
            <button className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
              Escalate Ticket
            </button>
            <button className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
              Review SLA Breaches
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
