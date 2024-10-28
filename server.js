import express from 'express';
import axios from 'axios';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config();
const app = express();
const port = process.env.PORT || 3001;

// Определяем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Указываем Express использовать папку dist для статических файлов
app.use(express.static(path.join(__dirname, 'dist')));

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
  return regions[tagLine] || 'europe';
};

// Универсальный обработчик для всех запросов Riot API
app.get('/rito/:tagLine/*', async (req, res) => {
  const { tagLine } = req.params;
  const riotPath = req.params[0];
  const region = getRegionByTagLine(tagLine);
  const apiKey = process.env.API_KEY;
  console.log('Тестовое логирование апи-ключа:', apiKey);

  try {
    const riotApiUrl = `https://${region}.api.riotgames.com/${riotPath}${req.originalUrl.split('?')[1] ? `?${req.originalUrl.split('?')[1]}` : ''}`;
    console.log(`URL запроса к Riot API: ${riotApiUrl}`);

    const response = await axios.get(riotApiUrl, {
      headers: {
        'X-Riot-Token': apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.log(`Ошибка запроса к Riot API (${apiKey}):`, error.response?.status || error.message);
    res.status(error.response?.status || 500).send(error.message);
  }
});

// Обрабатываем все маршруты, перенаправляя их на index.html (должен быть внизу)
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запускаем сервер на указанном порту
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});