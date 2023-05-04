import { createSlice } from '@reduxjs/toolkit';
import { fetchTeams, getTeamDetails } from './teamsThunk';

const initialState = {
  teams: [],
  isLoading: true,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    searchTeam: (state, { payload }) => ({
      ...state,
      teams: state.teams.map((team) => (
        team.teamName.toUpperCase().includes(payload.toUpperCase())
          ? { ...team, filtered: true }
          : { ...team, filtered: false })),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchTeams.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        teams: payload,
      }))
      .addCase(fetchTeams.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(getTeamDetails.pending, (state) => ({
        ...state,
        teamDetails: {
          isLoading: true,
        },
      }))
      .addCase(getTeamDetails.fulfilled, (state, { payload }) => ({
        ...state,
        teamDetails: {
          details: payload,
          isLoading: false,
        },
      }))
      .addCase(getTeamDetails.rejected, (state, { payload }) => ({
        ...state,
        teamDetails: {
          error: payload,
          isLoading: false,
        },
      }));
  },
});

export const { searchTeam } = teamSlice.actions;
export default teamSlice.reducer;
