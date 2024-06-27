/* eslint-disable no-undef, no-use-before-define, no-await-in-loop  */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { dispatch }) => {
  const base = 'https://aviasales-test-api.kata.academy';
  let shouldContinue = true;
  const ticketsArr = [];

  const searchIdRes = await fetch(`${base}/search`);
  const { searchId } = await searchIdRes.json();

  while (shouldContinue) {
    try {
      const ticketsRes = await fetch(`${base}/tickets?searchId=${searchId}`);
      if (!ticketsRes.ok) {
        throw new Error(`Failed to fetch tickets: ${ticketsRes.status} ${ticketsRes.statusText}`);
      }
      const ticketsData = await ticketsRes.json();
      ticketsArr.push(...ticketsData.tickets);
      if (ticketsArr.length === 500) {
        dispatch(addTickets(ticketsData.tickets));
        dispatch(setIsLoading(false));
      }
      shouldContinue = !ticketsData.stop;
    } catch (e) {
      console.log(e);
    }
  }

  return ticketsArr;
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
    isLoading: false,
  },
  reducers: {
    addTickets(state, action) {
      state.tickets.push(...action.payload);
    },
    setFilter(state, action) {
      const { id, isChecked } = action.payload;
      if (id === 'all') {
        state.filters.forEach((filter) => {
          filter.isChecked = isChecked;
        });
      } else {
        const filter = state.filters.find((f) => f.id === id);
        filter.isChecked = isChecked;
        const allFilter = state.filters.find((f) => f.id === 'all');
        allFilter.isChecked = state.filters.filter((f) => f.id !== 'all').every((f) => f.isChecked);
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
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = action.payload;
    });
  },
});

export const { addTickets, sortedTickets, setSortValue, setFilter, setIsLoading } = ticketsSlice.actions;
export default ticketsSlice.reducer;
