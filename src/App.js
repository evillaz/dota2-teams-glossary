import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from './components/layout/Layout';
import Home from './routes/Home';
import TeamDetails from './routes/TeamDetails';
import { fetchTeams } from './redux/teams/teamsThunk';
import './styles/style.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
