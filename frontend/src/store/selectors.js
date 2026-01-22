export const selectUpcomingEvent = (state) => {
  const now = new Date();

  return state.events.list
    .filter(event => new Date(event.datetime) > now)
    .sort(
      (a, b) =>
        new Date(a.datetime) - new Date(b.datetime)
    )[0];
};
