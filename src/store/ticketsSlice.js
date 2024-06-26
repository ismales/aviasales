import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const base = 'https://aviasales-test-api.kata.academy';

  const fetchIdRes = await fetch(`${base}/search`);
  const searchIdData = await fetchIdRes.json();
  const { searchId } = searchIdData;

  const ticketsRes = await fetch(`${base}/tickets?searchId=${searchId}`);
  if (!ticketsRes.ok) {
    throw new Error(`Failed to fetch tickets: ${ticketsRes.status} ${ticketsRes.statusText}`);
  }
  const ticketsData = await ticketsRes.json();

  return ticketsData.tickets;
});

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

  extraReducers: (builder) => {
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = action.payload;
    });
  },
});

export const { sortedTickets, setSortValue, setFilter } = ticketsSlice.actions;

export default ticketsSlice.reducer;

// fetchTickets = async () => {
//   let shouldContinue = true;
//   while (shouldContinue) {
//     try {
//       /* eslint-disable no-await-in-loop */
//       const ticketsRes = await this.getTickets();
//       this.saveTickets(ticketsRes.tickets);
//       shouldContinue = !ticketsRes.stop;
//     } catch (error) {}
//   }
// };
