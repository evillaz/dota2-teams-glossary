import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://api.opendota.com/api/teams/';

const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (name, thunkAPI) => {
    try {
      const resp = await fetch(baseUrl);
      const data = await resp.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const getTeamDetails = createAsyncThunk(
  'teams/fetchTeams',
  async (id, thunkAPI) => {
    try {
      const resp = await fetch(`${baseUrl}/${id}`);
      const data = await resp.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export { fetchTeams, getTeamDetails };
