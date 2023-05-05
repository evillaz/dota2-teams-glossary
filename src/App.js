import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import Home from './routes/Home';
import TeamDetails from './routes/TeamDetails';
import { fetchTeams } from './redux/teams/teamSlice';
import './styles/style.css';

function App() {
  const dispatch = useDispatch();
  const { fulfilled } = useSelector((store) => store.teams);

  useEffect(() => {
    if (!fulfilled) {
      dispatch(fetchTeams());
    }
  }, [dispatch, fulfilled]);

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
