Lol Project

## Описание
Проект для поиска информации о суммонерах и их последних матчах с использованием Riot Games API. Пользователь вводит никнейм, выбирает регион и получает PUUID игрока, который используется для запроса истории последних матчей.

## Технологии
- Vite
- React
- Express (для прокси-сервера)
- Riot Games API
- Axios

## Функционал
- Получение PUUID по никнейму и региону.
- Отображение 5 последних матчей игрока.

## Установка
1. Клонируйте репозиторий: `git clone https://github.com/Marapu1a/lol-proj`
2. Установите зависимости: `npm install`
3. Создайте файл `.env` в корне с API ключом Riot API и переменной NODE_ENV: 
   ```
   API_KEY=ваш_ключ
   NODE_ENV=development
   ```
4. Запустите прокси-сервер: `node server.js`
5. Запустите лайв-сервер: `npm run dev`

## Деплой
Проект задеплоен на [Render](https://render.com) и доступен по следующей ссылке: [https://lol-proj.onrender.com](https://lol-proj.onrender.com)