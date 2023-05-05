import { configureStore } from '@reduxjs/toolkit';
import { fetchTeams } from '../redux/teams/teamSlice';
import teamsReducer from '../redux/teams/teamSlice';

describe('teamSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { teams: teamsReducer },
    });
  });

  describe('fetchTeams', () => {
    it('should fetch teams successfully', async () => {
      const teams = [
        {
          teamId: 1,
          teamName: 'Team 1',
          logo: 'logo_url',
          rating: 5,
          tag: 'tag',
          wins: 10,
          losses: 5,
          winrate: '66.67%',
          filtered: true,
        },
        {
          teamId: 2,
          teamName: 'Team 2',
          logo: 'logo_url',
          rating: 7,
          tag: 'tag',
          wins: 20,
          losses: 10,
          winrate: '66.67%',
          filtered: true,
        },
      ];
      const payload = { teams };
      const fulfilledWith = fetchTeams.fulfilled(payload);
      await store.dispatch(fulfilledWith);
      const state = store.getState().teams;
      expect(state.isLoading).toBe(false);
      expect(state.teams.teams).toEqual(teams);
      expect(state.fulfilled).toBe(true);
    });
  });
});
