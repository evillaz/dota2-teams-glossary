import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

const TeamsList = () => {
  const { teams, isLoading } = useSelector((store) => store.teams);
  const handleImageError = (e) => {
    e.target.src = '/logo512.png';
    e.target.onerror = null;
  };
  const navigate = useNavigate();
  const filteredTeams = teams.filter((team) => team.filtered);
  const teamsWrapperClasses = 'teamsWrapper f';
  const teamClasses = 'team f c';
  const teamContainerClasses = 'teamContainer f';
  const teamInfoClasses = 'teamInfo f c';
  const teamItemClasses = 'teamItem f';
  return (
    <ul className={teamsWrapperClasses}>
      {isLoading && (
        <span className="teamsLoading">
          Loading...
        </span>
      )}
      {filteredTeams.map((team) => (
        <li
          className={teamItemClasses}
          key={team.teamId}
        >
          <button
            className={teamClasses}
            type="button"
            onClick={() => navigate(`/teams/${team.teamId}`)}
          >
            <HiOutlineArrowCircleRight
              className="teamButton"
              style={{ fontSize: '1.5rem' }}
            />
            <div className={teamContainerClasses}>
              <div className={teamInfoClasses}>
                <span className="teamTag">{team.tag}</span>
                <span className="teamName">{team.teamName}</span>
                <span className="teamRating">
                  Rating:&nbsp;
                  {team.rating}
                </span>
                <span className="teamWinrate">
                  Winrate:&nbsp;
                  {team.winrate}
                </span>
              </div>
              <img
                className="teamLogo"
                src={team.logo}
                alt="teamLogo"
                onErrorCapture={handleImageError}
              />
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TeamsList;
