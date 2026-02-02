import { useTickets } from "../../features/ticket/useTickets";
import TicketList from "../../components/TicketList";

export default function SupportTicketsPage() {
  const { tickets, loading, error } = useTickets();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Support Tickets</h1>
        <p className="text-gray-600 dark:text-gray-300">View and manage all tickets in the queue</p>
      </div>
      
      {loading && <div>Loading tickets...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && <TicketList tickets={tickets} />}
    </div>
  );
}
