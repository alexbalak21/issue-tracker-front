

import { useRole } from "../../features/auth/useRole";
import { useTickets } from "../../features/ticket/useTickets";
import { usePriorities } from "../../features/ticket/usePriorities";
import { useStatuses } from "../../features/ticket/useStatuses";
import StatusBadge from "../../components/StatusBadge";
import UserBadge from "../../components/UserBadge";
import TicketList from "../../components/TicketList";
import { priorityDotColors } from "../../utils/priorityDotColors";
import React from "react";

// --- StatsCards ---
function StatsCards({ tickets }: { tickets: import("../../features/ticket/useTickets").Ticket[] }) {
  const statusCounts = tickets.reduce(
    (acc, t) => {
      if (t.statusId === 1) acc.open++;
      else if (t.statusId === 2) acc.inProgress++;
      else if (t.statusId === 3) acc.resolved++;
      return acc;
    },
    { open: 0, inProgress: 0, resolved: 0 }
  );
  const cards = [
    { label: "Open", count: statusCounts.open, color: priorityDotColors[1].bg },
    { label: "In Progress", count: statusCounts.inProgress, color: priorityDotColors[2].bg },
    { label: "Resolved", count: statusCounts.resolved, color: priorityDotColors[3].bg },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((c) => (
        <div key={c.label} className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow p-4">
          <span className={`w-3 h-3 rounded-full mr-3 ${c.color}`}></span>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{c.label}</div>
            <div className="text-xl font-semibold">{c.count}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- PriorityChart ---
function PriorityChart({ tickets }: { tickets: import("../../features/ticket/useTickets").Ticket[] }) {
  const { priorities } = usePriorities();
  const counts = tickets.reduce((acc, t) => {
    acc[t.priorityId] = (acc[t.priorityId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  const max = Math.max(1, ...Object.values(counts));
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
      <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Tickets by Priority</div>
      <div className="space-y-2">
        {priorities.map((p) => (
          <div key={p.id} className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${priorityDotColors[p.id]?.bg || "bg-gray-400"}`}></span>
            <span className="w-20 text-xs text-gray-600 dark:text-gray-400">{p.name}</span>
            <div className="flex-1 mx-2">
              <div className="h-3 rounded bg-gray-200 dark:bg-gray-800">
                <div
                  className={`h-3 rounded ${priorityDotColors[p.id]?.bg || "bg-gray-400"}`}
                  style={{ width: `${((counts[p.id] || 0) / max) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs font-medium w-6 text-right">{counts[p.id] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- RecentActivity ---
function RecentActivity({ tickets }: { tickets: import("../../features/ticket/useTickets").Ticket[] }) {
  const { statuses } = useStatuses();
  const getStatus = (id: number) => statuses.find((s) => s.id === id)?.name || "Unknown";
  const getStatusColor = (id: number) => statuses.find((s) => s.id === id)?.color || "gray";
  const recent = [...tickets]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
      <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Recent Activity</div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {recent.length === 0 && <li className="py-2 text-gray-400 text-sm">No recent activity.</li>}
        {recent.map((t) => (
          <li key={t.id} className="flex items-center py-2">
            <span className="flex-1 truncate font-medium text-gray-800 dark:text-gray-100">
              {t.title}
            </span>
            <StatusBadge text={getStatus(t.statusId)} color={getStatusColor(t.statusId)} />
            <span className="ml-3 text-xs text-gray-500 dark:text-gray-400">
              {new Date(t.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const UserDashboard: React.FC = () => {
  const { isUser } = useRole();
  const { tickets, loading, error } = useTickets();

  if (!isUser) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-2 py-6">
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Dashboard</h1>
      <div className="mb-8 text-gray-600 dark:text-gray-300">Overview of your support tickets and recent activity.</div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <>
          <StatsCards tickets={tickets} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <PriorityChart tickets={tickets} />
            <RecentActivity tickets={tickets} />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <div className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Your Tickets</div>
            <TicketList tickets={tickets} showAdminColumns={false} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
