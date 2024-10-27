import express from 'express';
import axios from 'axios';
import { config } from 'dotenv';

config({ path: '../.env' });
console.log(process.env);
const app = express();
const port = 3001;

// Функция для конвертации tagLine в регион
const getRegionByTagLine = (tagLine) => {
  const regions = {
    EUW1: 'europe',
    EUN1: 'europe',
    NA1: 'americas',
    BR1: 'americas',
    JP1: 'asia',
    KR: 'asia',
    OC1: 'sea',
    TR1: 'europe',
    RU: 'europe',
    LA1: 'americas',
    LA2: 'americas',
  };

  return regions[tagLine] || 'europe'; // Если сервер неизвестен, используем Europe по умолчанию
};

// Универсальный обработчик для всех запросов Riot API
app.get('/rito/:tagLine/*', async (req, res) => {
  const { tagLine } = req.params; // Извлекаем tagLine (например, EUW1)
  const riotPath = req.params[0]; // Извлекаем оставшуюся часть пути после /riot/:tagLine/
  const region = getRegionByTagLine(tagLine); // Определяем регион по tagLine
  const apiKey = process.env.API_KEY; // Riot API ключ

  try {
    // Формируем финальный URL для запроса к Riot API. Из-за возникших проблем с подстановкой дополнительных параметров в запрос, пришлось писать тут квакозябру
    const riotApiUrl = `https://${region}.api.riotgames.com/${riotPath}${req.originalUrl.split('?')[1] ? `?${req.originalUrl.split('?')[1]}` : ''}`;
    console.log(`URL запроса к Riot API: ${riotApiUrl}`); // Логируем URL для проверки

    // Отправляем запрос к Riot API
    const response = await axios.get(riotApiUrl, {
      headers: {
        'X-Riot-Token': apiKey, // Передаём Riot API ключ в заголовке
      },
    });

    // Возвращаем данные клиенту
    res.json(response.data);
  } catch (error) {
    // Логируем ошибку, если запрос не удался
    console.log(`Ошибка запроса к Riot API (${apiKey}):`, error.response?.status || error.message);
    res.status(error.response?.status || 500).send(error.message);
  }
});

// Запускаем сервер на порту 3001
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
