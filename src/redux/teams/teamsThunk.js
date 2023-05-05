import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://api.opendota.com/api/teams/';

const fetchTeams = createAsyncThunk(
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

const getTeamDetails = createAsyncThunk(
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

export { fetchTeams, getTeamDetails };
