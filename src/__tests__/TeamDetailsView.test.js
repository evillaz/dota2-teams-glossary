import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import store from '../redux/store';
import TeamDetailsView from '../components/TeamDetailsView';

describe('TeamDetailsView component', () => {
  it('should render correctly', () => {
    const fakeTeamDetails = {
      isLoading: false,
      details: [
        {
          account_id: 123,
          name: 'Player 1',
          games_played: 10,
          winrate: 50,
        },
        {
          account_id: 456,
          name: 'Player 2',
          games_played: 15,
          winrate: 60,
        },
      ],
    };

    const fakeTeams = [
      {
        teamId: 1,
        teamName: 'Team A',
        logo: 'logo.png',
      },
      {
        teamId: 2,
        teamName: 'Team B',
        logo: 'logo.png',
      },
    ];

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/teams/${fakeTeams[0].teamId}`]}>
          <Routes>
            <Route path="/teams/:teamId" element={<TeamDetailsView />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    store.dispatch({ type: 'teams/getTeamDetails/fulfilled', payload: fakeTeamDetails });
    store.dispatch({ type: 'teams/getTeams/fulfilled', payload: fakeTeams });

    expect(container).toMatchSnapshot();
  });
});
