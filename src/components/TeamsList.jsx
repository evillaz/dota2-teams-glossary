import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

const TeamsList = () => {
  const { teams } = useSelector((store) => store.teams);
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
  return (
    <div className={teamsWrapperClasses}>
      {filteredTeams.map((team) => (
        <button
          className={teamClasses}
          key={team.teamId}
          type="button"
          onClick={() => navigate(`/teams/${team.teamId}`)}
        >
          <HiOutlineArrowCircleRight className="teamButton" />
          <div className={teamContainerClasses}>
            <div className={teamInfoClasses}>
              <span>{team.tag}</span>
              <span>{team.teamName}</span>
              <span>
                Rating:
                {team.rating}
              </span>
              <span>
                Winrate:
                {team.winrate}
              </span>
            </div>
            <img
              className="teamLogo"
              src={team.logo}
              alt="teamLogo"
              style={{ backgroundColor: 'black' }}
              onErrorCapture={handleImageError}
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default TeamsList;
