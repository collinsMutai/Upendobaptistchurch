export const selectUpcomingSermon = (state) => {
  const now = new Date();
  return state.sermons.list
    .filter(sermon => new Date(sermon.datetime) > now)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))[0];
};
