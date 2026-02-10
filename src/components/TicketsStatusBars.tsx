import type { Ticket } from "@features/ticket/useTickets";

// Statuses data (could be imported from a shared file or fetched)
const STATUSES = [
  { id: 1, name: "Open", color: "blue" },
  { id: 2, name: "In Progress", color: "violet" },
  { id: 3, name: "Waiting", color: "yellow" },
  { id: 4, name: "On Hold", color: "orange" },
  { id: 5, name: "Resolved", color: "green" },
  { id: 6, name: "Closed", color: "gray" },
  { id: 7, name: "Canceled", color: "brown" },
];

// Map status color to Tailwind classes
const STATUS_COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500",
  violet: "bg-indigo-500",
  yellow: "bg-yellow-400",
  orange: "bg-orange-500",
  green: "bg-green-500",
  gray: "bg-gray-400",
  brown: "bg-amber-900",
};

interface TicketsStatusBarsProps {
  tickets: Ticket[];
  maxY?: number; // Optional: max Y value for scaling
}

export default function TicketsStatusBars({ tickets, maxY }: TicketsStatusBarsProps) {
  // Count tickets per status
  const statusCounts = STATUSES.map(status => ({
    ...status,
    count: tickets.filter(t => t.statusId === status.id).length,
  }));
  const max = maxY || Math.max(...statusCounts.map(s => s.count), 1);

  // Tallest bar is 100% height, others scale proportionally
  return (
    <div className="flex items-end gap-4 h-50 bg-white p-4 rounded shadow">
      {statusCounts.map(status => {
        // Calculate height in percent, min 8px for visibility
        const heightPercent = max > 0 ? (status.count / max) * 100 : 0;
        return (
          <div key={status.id} className="flex flex-col items-center w-10" style={{height: '100%'}}>
            <div className="relative w-full flex-1 flex items-end">
              <div
                className={`w-full rounded-t ${STATUS_COLOR_MAP[status.color]}`}
                style={{ height: `${heightPercent}%`, minHeight: status.count > 0 ? 8 : 2, transition: 'height 0.3s' }}
                title={`${status.name}: ${status.count}`}
              ></div>
            </div>
            <span className="mt-2 text-xs text-center whitespace-nowrap">{status.name}</span>
            <span className="text-xs text-gray-500">{status.count}</span>
          </div>
        );
      })}
    </div>
  );
}
