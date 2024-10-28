import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const pref = isProduction ? '/rito/' : '/api/rito/';
console.log(isProduction, pref)

// Функция для получения PUUID по gameName и tagLine
export const getSummonerPUUID = (gameName, tagLine) => {
    return axios.get(`${pref}riot/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`)
        .then(response => {
            console.log(response.data.puuid)
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при запросе PUUID:', error);
            throw error;
        });
};

// Функция для получения списка из 5 matchId
export const getMatchHistory = (puuid) => {
    return axios.get(`${pref}lol/lol/match/v5/matches/by-puuid/${puuid}/ids?count=5`) //вручную количество матчей изменил, чтоб избежать ограничения RIOT
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при запросе матчей', error);
            throw error;
        });
};

// Функция для получения подробной статистики матча по matchId
export const getMatchDetails = (matchId) => {
    return axios.get(`${pref}lol/lol/match/v5/matches/${matchId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при запросе деталей матча', error);
            throw error;
        });
};