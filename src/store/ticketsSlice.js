import { createSlice } from '@reduxjs/toolkit';

const filters = [
  { id: 'all', name: 'Все', isChecked: false },
  { id: 'noStop', name: 'Без пересадок', isChecked: false },
  { id: 'oneStop', name: '1 пересадка', isChecked: false },
  { id: 'twoStops', name: '2 пересадки', isChecked: false },
  { id: 'threeStops', name: '3 пересадки', isChecked: false },
];

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    searchId: null,
    tickets: [],
    sortValue: null,
    filters,
  },
  reducers: {
    setFilter(state, action) {
      const { id, isChecked } = action.payload;

      if (id === 'all') {
        state.filters.forEach((filt) => {
          filt.isChecked = isChecked;
        });
      } else {
        state.filters.find((f) => f.id === id).isChecked = isChecked;

        if (state.filters.filter((filt) => filt.id !== 'all').every((filt) => filt.isChecked)) {
          state.filters[0].isChecked = true;
        } else {
          state.filters[0].isChecked = false;
        }
      }
    },

    sortedTickets(state) {
      if (state.sortValue === 'Самый дешевый') {
        state.tickets = state.tickets.sort((a, b) => a.price - b.price);
      }

      if (state.sortValue === 'Самый быстрый') {
        state.tickets = state.tickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration);
      }
    },

    setSortValue(state, action) {
      state.sortValue = action.payload.sort;
    },
  },
});

export const { sortedTickets, setSortValue, setFilter } = ticketsSlice.actions;

export default ticketsSlice.reducer;

// {
//   carrier: 'DP',
//   price: 19950,
//   segments: [
//     {
//       date: '2024-07-07T19:23:37.881Z',
//       destination: 'HKT',
//       duration: 1214,
//       origin: 'MOW',
//       stops: ['DXB', 'JNB'],
//     },
//     {
//       date: '2024-10-03T10:37:28.129Z',
//       destination: 'MOW',
//       duration: 1425,
//       origin: 'HKT',
//       stops: ['DOH', 'HKG', 'JNB'],
//     },
//   ],
// };
