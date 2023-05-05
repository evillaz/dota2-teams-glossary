import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getTeamDetails } from '../redux/teams/teamsThunk';

const TeamDetailsView = () => {
  const path = useLocation();
  const teamId = Number(path.pathname.split('/')[2]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamDetails(teamId));
  }, [dispatch, teamId]);

  const { teamDetails, teams } = useSelector((store) => store.teams);

  const team = teams.find((t) => t.teamId === teamId);
  const handleImageError = (e) => {
    e.target.src = '/logo512.png';
    e.target.onerror = null;
  };

  return (
    <>
      <div className="detailsWrapper">
        {teamDetails.isLoading && (
          <span className="detailsLoading">
            Loading...
          </span>
        )}
        {(!teamDetails.isLoading && team) && (
          <>
            <div className="detailsHeader">
              <h2>
                {team.teamName}
              </h2>
              <img
                className="teamDetailsLogo"
                src={team.logo}
                alt="teamLogo"
                onErrorCapture={handleImageError}
              />
            </div>
            <table className="detailsTable">
              <thead className="detailsTableHeader">
                <tr>
                  <th>
                    Current Members
                  </th>
                </tr>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Games
                  </th>
                  <th>
                    Winrate
                  </th>
                </tr>
              </thead>
              <tbody className="teamPlayers">
                {teamDetails.details.map((d) => (
                  <tr key={d.account_id}>
                    <td>{d.name}</td>
                    <td>{d.games_played}</td>
                    <td>{d.winrate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </>
        )}

      </div>
    </>
  );
};

export default TeamDetailsView;
