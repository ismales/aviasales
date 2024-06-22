class TicketsService {
  base = 'https://aviasales-test-api.kata.academy';

  tickets = [];

  constructor() {
    this.getSearchID()
      .then((res) => this.saveSearchID(res.searchId))
      .then(() => this.fetchTickets());
  }

  fetchTickets = async () => {
    let shouldContinue = true;
    while (shouldContinue) {
      try {
        const ticketsRes = await this.getTickets();
        this.saveTickets(ticketsRes.tickets);
        shouldContinue = !ticketsRes.stop;
        // console.log(this.tickets.length, ticketsRes.stop);
      } catch (error) {
        console.error('Error fetching tickets, retrying:', error);
      }
    }

    console.log('All tickets fetched:', this.tickets.length);
  };

  getSearchID = async () => {
    const res = await fetch(`${this.base}/search`);
    if (!res.ok) {
      throw new Error(`Failed to fetch search ID: ${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  saveSearchID = (searchId) => {
    this.id = searchId;
  };

  getTickets = async () => {
    const res = await fetch(`${this.base}/tickets?searchId=${this.id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch tickets: ${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  saveTickets = (tickets) => {
    this.tickets.push(...tickets);
  };
}
