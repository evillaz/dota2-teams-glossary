import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  isLoading: true,
  teamDetails: {
    details: [],
    isLoading: true,
  },
  fulfilled: false,
};

const baseUrl = 'https://api.opendota.com/api/teams/';

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (name, thunkAPI) => {
    try {
      const resp = await fetch(baseUrl);
      const data = await resp.json();
      const teams = data.map((t) => (
        {
          teamId: t.team_id,
          teamName: t.name,
          logo: t.logo_url,
          rating: t.rating,
          tag: t.tag,
          wins: t.wins,
          losses: t.losses,
          winrate: `${((t.wins / (t.wins + t.losses)) * 100).toFixed(2)}%`,
          filtered: true,
        }
      ));
      return teams;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getTeamDetails = createAsyncThunk(
  'teams/getTeamDetails',
  async (id, thunkAPI) => {
    try {
      const resp = await fetch(`${baseUrl}${id}/players`);
      const data = await resp.json();
      const players = data.filter((p) => p.is_current_team_member).map((p) => ({
        ...p,
        winrate: `${((p.wins / p.games_played) * 100).toFixed(2)}%`,
      }));

      return players;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

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
        fulfilled: true,
      }))
      .addCase(fetchTeams.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
        fulfilled: true,
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

export const { searchTeam, getTeam } = teamSlice.actions;
export default teamSlice.reducer;
