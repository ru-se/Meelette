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




// Google Maps API を使用して検索を行うエンドポイント
app.get('/search-shops', async (req, res) => {
  console.log('Received query parameters:', req.query); // クエリパラメータをログに出力
  
  const { location, genre } = req.query;


  if (!location || !genre) {
    return res.status(400).json({ error: 'Location and genre are required' });
  }

  // 検索を行う
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const genreEncoded = encodeURIComponent(genre); // genreをエンコード
  const locationEncoded = encodeURIComponent(location); // locationをエンコード

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${genreEncoded}+in+${locationEncoded}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    const results = response.data.results;

    console.log('Google Maps API Response:', results); // デバッグ用のログ
    console.log('Google Maps API Response:', location, genre); // デバッグ用のログ
    console.log('Google Maps API Response:', process.env.GOOGLE_MAPS_API_KEY); // デバッグ用のログ
    console.log('Google Maps API Response:', url); // デバッグ用のログ
    console.log('Google Maps API Response:', response.data); // デバッグ用のログ

    if (results.length === 0) {
      return res.status(404).json({ error: 'No matching shops found' });
    }

    // ランダムに4件選択
    const randomShops = [];
    while (randomShops.length < 4 && results.length > 0) {
      const randomIndex = Math.floor(Math.random() * results.length);
      const shop = results.splice(randomIndex, 1)[0];
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

