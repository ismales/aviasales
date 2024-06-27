/* eslint-disable no-plusplus, no-shadow */
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTickets } from '../../store/ticketsSlice';

import classes from './TicketsList.module.scss';

import Ticket from '../Ticket/Ticket';
import Loader from '../Loader/Loader';

export default function TicketsList() {
  const ticketID = useRef(1);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.tickets.isLoading);
  const tickets = useSelector((state) => state.tickets.tickets);

  const [foneLoading, setFoneLoading] = useState(true);
  const [ticketLimit, setTicketLimit] = useState(5);

  useEffect(() => {
    dispatch(fetchTickets()).catch(() => dispatch(fetchTickets()));
  }, [dispatch]);

  useEffect(() => {
    if (tickets.length > 9000) {
      setFoneLoading(false);
    }
  }, [tickets]);

  const limitTicketsViewCount = (tickets, limit) => tickets.slice(0, limit);
  const limitedTickets = limitTicketsViewCount(tickets, ticketLimit);

  const handleShowMore = () => {
    setTicketLimit(ticketLimit + 5);
  };

  const content = (
    <>
      <ul>
        {limitedTickets.map((ticket) => (
          <Ticket key={ticketID.current++} ticket={ticket} />
        ))}
      </ul>
      {tickets.length > ticketLimit && (
        <button type="button" className={classes['show-more-btn']} onClick={handleShowMore}>
          Показать ещё
        </button>
      )}
    </>
  );

  // const loader1 = foneLoading ? <Loader /> : <div>Загрузка завершена</div>;
  const loader = (
    <div className={classes['tickets-list__loader']}>{foneLoading ? <Loader /> : 'Загрузка завершена'}</div>
  );

  return (
    <div>
      {loader}
      <div>{!isLoading && content}</div>
    </div>
  );
}
