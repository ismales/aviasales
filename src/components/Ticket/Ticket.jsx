import { format, add } from 'date-fns';

import classes from './Ticket.module.scss';

export default function TicketsList() {
  const tickets = [
    {
      id: 2,
      price: 19950,
      carrier: 'DP',
      segments: [
        {
          origin: 'MOW',
          destination: 'HKT',
          date: '2024-07-07T19:23:37.881Z',
          duration: 1214,
          stops: ['QWE', 'ASD'],
        },
        {
          origin: 'HKT',
          destination: 'MOW',
          date: '2024-10-03T10:37:28.129Z',
          duration: 1425,
          stops: ['ASD', 'QWE'],
        },
      ],
    },
  ];

  const sending = (segment) => format(new Date(segment.date), 'HH:mm');

  const arrival = (segment) =>
    format(
      add(new Date(segment.date), {
        minutes: segment.duration,
      }),
      'kk:mm'
    );

  const stops = (segment) => segment.stops.map((name) => name).join(', ');

  return (
    <li id={tickets.id} className={classes.ticket}>
      <div className={classes['ticket-header']}>
        <span className={classes.price}>{tickets[0].price}</span>
        <img src={`https://pics.avs.io/110/36/${tickets[0].carrier}.png`} alt="flight company logo" />
      </div>

      <div className={classes['flight-info']}>
        <div className={classes.block}>
          <span className={classes.title}>
            {tickets[0].segments[0].origin} - {tickets[0].segments[0].destination}
          </span>
          <span className={classes.desc}>
            {sending(tickets[0].segments[0])} - {arrival(tickets[0].segments[0])}
          </span>
        </div>
        <div className={classes.block}>
          <span className={classes.title}>В ПУТИ</span>
          <span
            className={classes.desc}
          >{`${Math.floor(tickets[0].segments[0].duration / 60)}ч ${tickets[0].segments[0].duration % 60}м`}</span>
        </div>
        <div className={classes.block}>
          <span className={classes.title}>2 ПЕРЕСАДКИ</span>
          <span className={classes.desc}>{stops(tickets[0].segments[0])}</span>
        </div>
      </div>

      <div className={classes['flight-info']}>
        <div className={classes.block}>
          <span className={classes.title}>
            {tickets[0].segments[1].origin} - {tickets[0].segments[1].destination}
          </span>
          <span className={classes.desc}>
            {sending(tickets[0].segments[1])} - {arrival(tickets[0].segments[1])}
          </span>
        </div>
        <div className={classes.block}>
          <span className={classes.title}>В ПУТИ</span>
          <span
            className={classes.desc}
          >{`${Math.floor(tickets[0].segments[1].duration / 60)}ч ${tickets[0].segments[1].duration % 60}м`}</span>
        </div>
        <div className={classes.block}>
          <span className={classes.title}>2 ПЕРЕСАДКИ</span>
          <span className={classes.desc}>{stops(tickets[0].segments[1])}</span>
        </div>
      </div>
    </li>
  );
}
