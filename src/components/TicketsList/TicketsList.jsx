import React from 'react';

import Ticket from '../Ticket/Ticket';
// import classes from './TicketsList.module.scss';

export default function TicketsList() {
  const tickets = [
    {
      id: 1,
      price: 19950,
      carrier: 'DP',
      segments: [
        {
          origin: 'MOW',
          destination: 'HKT',
          date: '2024-07-07T19:23:37.881Z',
          duration: 1214,
          stops: [Array],
        },
        {
          origin: 'HKT',
          destination: 'MOW',
          date: '2024-10-03T10:37:28.129Z',
          duration: 1425,
          stops: [Array],
        },
      ],
    },
    {
      id: 1,
      price: 19950,
      carrier: 'DP',
      segments: [
        {
          origin: 'MOW',
          destination: 'HKT',
          date: '2024-07-07T19:23:37.881Z',
          duration: 1214,
          stops: [Array],
        },
        {
          origin: 'HKT',
          destination: 'MOW',
          date: '2024-10-03T10:37:28.129Z',
          duration: 1425,
          stops: [Array],
        },
      ],
    },
    {
      id: 1,
      price: 19950,
      carrier: 'DP',
      segments: [
        {
          origin: 'MOW',
          destination: 'HKT',
          date: '2024-07-07T19:23:37.881Z',
          duration: 1214,
          stops: [Array],
        },
        {
          origin: 'HKT',
          destination: 'MOW',
          date: '2024-10-03T10:37:28.129Z',
          duration: 1425,
          stops: [Array],
        },
      ],
    },
  ];

  return (
    <ul>
      {tickets.map(() => {
        return <Ticket />;
      })}
    </ul>
  );
}
