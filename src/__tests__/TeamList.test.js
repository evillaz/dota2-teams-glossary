import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import TeamsList from '../components/TeamsList';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../logo512.png', () => 'test-logo');

describe('TeamsList', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) =>
      callback({
        teams: {
          teams: [
            {
              teamId: 1,
              tag: 'TEST',
              teamName: 'Test Team',
              rating: 1000,
              winrate: 50,
              logo: '../logo512.png',
              filtered: true,
            },
          ],
          isLoading: false,
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    const { getByText } = render(<TeamsList />);
    expect(getByText('Test Team')).toBeInTheDocument();
  });

  it('handles image errors', () => {
    const { getByAltText } = render(<TeamsList />);
    fireEvent.error(getByAltText('teamLogo'));
    expect(getByAltText('teamLogo')).toHaveAttribute('src', '/logo512.png');
  });

  it('navigates to the team details page', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { getByText } = render(<TeamsList />);
    fireEvent.click(getByText('Test Team'));
    expect(navigate).toHaveBeenCalledWith('/teams/1');
  });
});