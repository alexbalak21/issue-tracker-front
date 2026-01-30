import { useState } from "react";
import { useAuth } from "../auth";

interface CreateTicketPayload {
  title: string;
  body: string;
  priorityId: number;
}

export function useCreateTicket() {
  const { apiClient } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createTicket = async (payload: CreateTicketPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await apiClient("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let message = "Failed to create ticket";
        try {
          const errBody = await res.json();
          message = errBody?.message ?? message;
        } catch {}
        throw new Error(message);
      }
      setSuccess(true);
      return await res.json();
    } catch (err: any) {
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTicket, loading, error, success };
}
