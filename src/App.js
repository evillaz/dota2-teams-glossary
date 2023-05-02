import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './routes/Home';
import TeamDetails from './routes/TeamDetails';

function App() {
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
