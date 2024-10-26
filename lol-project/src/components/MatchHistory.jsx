import { useEffect, useState } from 'react';
import { getMatchHistory, getMatchDetails } from '../api/riotApi';

// eslint-disable-next-line react/prop-types
const MatchHistory = ({ puuid }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (puuid) {
        try {
          const matchIds = await getMatchHistory(puuid);
          const matchDetailsPromises = matchIds.map(matchId => getMatchDetails(matchId));
          const matchDetails = await Promise.all(matchDetailsPromises);

          const formattedMatches = matchDetails.map(match => ({
            id: match.metadata.matchId,
            gameCreation: match.info.gameCreation,
          }));

          setMatches(formattedMatches);
          setLoading(false);
          setError(null);
        } catch (err) {
          console.error('Ошибка при загрузке матчей:', err);
          setError('Не удалось загрузить матчи.');
          setLoading(false);
        }
      }
    };

    fetchMatchHistory();
  }, [puuid]);

  if (loading) return <p>Загрузка матчей...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='match-history'>
      <ul>
        {matches.length > 0 ? (
          matches.map((match) => (
            <li key={`${match.id}-${puuid}`}>
              <a href={`/match/${match.id}/${puuid}`} target="_blank" rel="noopener noreferrer">
                Открыть статистику матча {new Date(match.gameCreation).toLocaleString()}
              </a>
            </li>
          ))
        ) : (
          <p>Матчи не найдены</p>
        )}
      </ul>
    </div>
  );
};

export default MatchHistory;