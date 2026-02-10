import { MatrixTable } from "@components/MatrixTable";

export interface ManagerPriorityMatrixProps {
  tickets: Array<{ assignedTo?: number | null; priorityId?: number }>;
  users: Array<{ id: number; name: string }>;
  priorities: Array<{ id: number; name: string }>;
}

// Wrapper component to use MatrixTable for ticket counts by user and priority
export function ManagerPriorityMatrix({ tickets, users, priorities }: ManagerPriorityMatrixProps) {
  return (
    <MatrixTable
      title="Tickets by Agent & Priority"
      rows={users}
      columns={priorities}
      getRowLabel={(user) => user.name}
      getColumnLabel={(priority) => priority.name}
      getValue={(user, priority) =>
        tickets.filter(
          (t) => t.assignedTo === user.id && t.priorityId === priority.id
        ).length
      }
    />
  );
}
