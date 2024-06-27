/* eslint-disable no-plusplus, no-shadow */
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFoneLoading, setSortValue } from '../../store/ticketsSlice';

import classes from './TicketsList.module.scss';

import Ticket from '../Ticket/Ticket';
import Loader from '../Loader/Loader';

export default function TicketsList() {
  const ticketID = useRef(1);
  const dispatch = useDispatch();
  const isTicketsLoad = useSelector((state) => state.tickets.isTicketsLoad);
  const isFoneLoading = useSelector((state) => state.tickets.isFoneLoading);
  const filteredTickets = useSelector((state) => state.tickets.filteredTickets);
  const sortValue = useSelector((state) => state.tickets.sortValue);

  const [showTicketsLimit, setShowTicketsLimit] = useState(5);

  useEffect(() => {
    if (!isTicketsLoad) {
      dispatch(setFoneLoading(false));
    }
    dispatch(setSortValue(sortValue));
  }, [filteredTickets, sortValue]);

  const limitTicketsViewCount = (tickets, limit) => tickets.slice(0, limit);
  const limitedTickets = limitTicketsViewCount(filteredTickets, showTicketsLimit);

  const handleShowMore = () => {
    setShowTicketsLimit(showTicketsLimit + 5);
  };

  const content = (
    <>
      <ul>
        {limitedTickets.map((ticket) => (
          <Ticket key={ticketID.current++} ticket={ticket} />
        ))}
      </ul>
      {filteredTickets.length > showTicketsLimit && (
        <button type="button" className={classes['show-more-btn']} onClick={handleShowMore}>
          Показать ещё
        </button>
      )}
    </>
  );

  const noRes = <div className={classes['no-results-message']}>Билетов под заданные фильтры не найдено</div>;

  const loader = (
    <div className={classes['tickets-list__loader']}>{isTicketsLoad ? <Loader /> : 'Билеты загружены'}</div>
  );

  return (
    <div className={classes.container}>
      {loader}
      {!isFoneLoading && !filteredTickets.length ? noRes : content}
    </div>
  );
}
