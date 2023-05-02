import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './teams/teamSlice';

const store = configureStore({
  reducer: {
    teams: teamsReducer,
  },
});

export default store;
