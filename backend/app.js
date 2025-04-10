//インストールしたパッケージ
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const axios = require('axios');
require('dotenv').config(); // 追加

// ポート番号
const port = 8000

const app = express() // expressを実行
app.use(express.json()) //jsonのリクエスト/レスポンスを正しく受け取る為に必要
app.use(cors()) // corsを有効にする

// ハローワールドを表示するエンドポイント
app.get('/helloworld', (req, res) => {
  res.send('Hello World!')
})


// Google Maps API を使用して検索を行うエンドポイント
app.get('/search-shops', async (req, res) => {
  const { location, genre } = req.query;

  if (!location || !genre) {
    return res.status(400).json({ error: 'Location and genre are required' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const genreEncoded = encodeURIComponent(genre);
  const locationEncoded = encodeURIComponent(location);

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${genreEncoded}+in+${locationEncoded}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No matching shops found' });
    }

    // 飲食店以外や指定されたジャンルに合わないものを除外
    const filteredResults = results.filter((shop) => {
      const types = shop.types || [];
      return (
        types.includes('restaurant') || // 飲食店であることを確認
        types.includes('food') || // 食品関連であることを確認
        types.includes('cafe') // カフェも含む
      );
    });

    if (filteredResults.length === 0) {
      return res.status(404).json({ error: 'No matching shops found after filtering' });
    }

    // ランダムに4件選択
    const randomShops = [];
    while (randomShops.length < 4 && filteredResults.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredResults.length);
      const shop = filteredResults.splice(randomIndex, 1)[0];


      randomShops.push(shop);
    }

    return res.json(randomShops);
  } catch (error) {
    console.error('Error searching shops:', error);
    return res.status(500).json({ error: 'Error searching shops' });
  }
});


// ランダムにジャンルを返すエンドポイント
app.get('/random-genre', (req, res) => {
  const genres = ['中華', '洋食', '和食', 'カフェ', '韓国料理', 'ラーメン'];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  return res.json({ genre: randomGenre });
});



//portを開く
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

