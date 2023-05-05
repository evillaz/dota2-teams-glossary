import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavBar from '../components/layout/NavBar';

describe('NavBar', () => {
  test('renders a search input when not on the teams page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/home']}>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search for a Team');
    expect(searchInput).toBeInTheDocument();
  });

  test('does not render a search input when on the teams page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/teams/1']}>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.queryByPlaceholderText('Search for a Team');
    expect(searchInput).not.toBeInTheDocument();
  });

  test('renders the correct title on the teams page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/teams/1']}>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByText('Team Info');
    expect(title).toBeInTheDocument();
  });
});
