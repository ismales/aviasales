/* eslint-disable no-plusplus */
import { useSelector } from 'react-redux';

import Ticket from '../Ticket/Ticket';

export default function TicketsList() {
  let ticketID = 1;
  const tickets = useSelector((state) => state.tickets.tickets);

  const limitTicketsViewCount = (ticketsArr, limit) => ticketsArr.slice(0, limit);
  const limitedTickets = limitTicketsViewCount(tickets, 5);

  return (
    <ul>
      {limitedTickets.map((ticket) => (
        <Ticket key={ticketID++} ticket={ticket} />
      ))}
    </ul>
  );
}
