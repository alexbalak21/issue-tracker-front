import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Ticket } from '../../features/ticket/useTickets';
import { usePriorities } from '../../features/ticket/usePriorities';
import { useStatuses } from '../../features/ticket/useStatuses';
import { useUser } from '../../features/user';
import { useAuth } from '../../features/auth';
import StatusChip from '../../components/StatusChip';
import Tooltip from '../../components/Tooltip';
import { PriorityChip } from '../../components/PriorityChip';
import AssignedChip from '../../components/AssignedChip';


const TicketDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { apiClient } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { priorities } = usePriorities();
  const { statuses } = useStatuses();
  const { user } = useUser();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    apiClient(`/api/tickets/${id}`)
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("Failed to fetch ticket");
        const data = await res.json();
        if (isMounted) setTicket(data.ticket);
      })
      .catch((err: any) => {
        if (isMounted) setError(err.message || "Error fetching ticket");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id, apiClient]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!ticket) {
    return <div>Ticket not found.</div>;
  }

  const priority = priorities.find((p) => p.id === ticket.priorityId);
  const status = statuses.find((s) => s.id === ticket.statusId);

  // If you want to show user info, you may need to fetch user by id. For now, just show the id.

  return (
    <div className="min-h-[60vh] max-w-7xl mx-auto mt-6">
      <div className="border border-gray-300 w-full rounded-lg p-6 min-w-[350px] bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {ticket.title}
          </h1>

          <div className="flex flex-col items-center gap-2">
            <Tooltip content={`Status`}>
              <div>
                <StatusChip statusId={ticket.statusId} statusName={status?.name} />
              </div>
            </Tooltip>
            <Tooltip content={`Assigned To`}>
              <div>
                <AssignedChip userId={ticket.assignedTo} />
              </div>
            </Tooltip>
          </div>
        </div>
         <div className="mt-3 flex items-center gap-2">
          <span className="font-extralight pb-1">Priority:</span>
          <Tooltip content={`Priority`}>
            <span className="inline-block">
              <PriorityChip priorityId={ticket.priorityId} priorityName={priority?.name} />
            </span>
          </Tooltip>
        </div>

        <div className="my-4 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 h-[50vh]">{ticket.body}</div>
        <div className="mb-2"></div>
       
        <div className="mb-2"><span className="font-semibold">Created by (user id):</span> {ticket.createdBy}</div>
        <div className="mb-2"><span className="font-semibold">Assigned to (user id):</span> {ticket.assignedTo ?? 'Unassigned'}</div>
        <div className="mb-2"><span className="font-semibold">Created at:</span> {new Date(ticket.createdAt).toLocaleString()}</div>
        <div className="mb-2"><span className="font-semibold">Updated at:</span> {new Date(ticket.updatedAt).toLocaleString()}</div>
        {ticket.resolvedAt && (
          <div className="mb-2"><span className="font-semibold">Resolved at:</span> {new Date(ticket.resolvedAt).toLocaleString()}</div>
        )}
      </div>
    </div>
  );
};

export default TicketDetailsPage;
