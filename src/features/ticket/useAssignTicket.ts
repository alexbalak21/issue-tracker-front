import { useState } from 'react';
import { useAuth } from '../auth';

type AssignTicketParams = {
  ticketId: string | number;
  userId: number | null;
};

type UseAssignTicketReturn = {
  loading: boolean;
  error: string | null;
  assignTicket: (params: AssignTicketParams) => Promise<void>;
};

export const useAssignTicket = (): UseAssignTicketReturn => {
  const { apiClient } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignTicket = async ({ ticketId, userId }: AssignTicketParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient(`/api/tickets/${ticketId}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to assign ticket');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, assignTicket };
};
