//インストールしたパッケージ
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

// ポート番号
const port = 8000

const app = express() // expressを実行
app.use(express.json()) //jsonのリクエスト/レスポンスを正しく受け取る為に必要
app.use(cors()) // corsを有効にする

// mysqlの接続に必要な情報を記載する（それぞれ自身のmysql情報を入力していく）
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin',
  password: 'Lana_0703',
  database: 'Meelette'
})

// mysql接続
con.connect((err) => {
  if (err) throw err
  console.log('Connected')
})

// GETリクエストテスト
// mysqlからデータを取得して表示させる
app.get('/sql-data', (req, res) => {
  const sql = 'select * from shops'

  // con.query()でsql文を実行して結果をresultに格納する
  con.query(sql, (err, result) => {
    // エラーが発生した場合はエラーメッセージを返す
    if(err) {
      return res.status(400).json({"error": err.message})
    }
    // エラーが発生しなかった場合はsql文で取得したデータを返す
    return res.json(result)
  })
})

// 指定された場所、カテゴリ、ジャンルに一致するお店をランダムに選んで返すメソッド
app.get('/random-shop', (req, res) => {
  const { location, category, genre } = req.query;

  // location, category, genre が未定義または空の場合の処理
  if (!location && !category && !genre) {
    return res.status(400).json({ "error": "At least one of location, category, or genre is required" });
  }

  let sql = 'SELECT * FROM shops WHERE 1=1';
  const params = [];

  if (location && location !== '指定しない') {
    sql += ' AND shopPosition = ?';
    params.push(location);
  }
  if (category && category !== '指定しない') {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (genre && genre !== '指定しない') {
    sql += ' AND genre = ?';
    params.push(genre);
  }

  sql += ' ORDER BY RAND() LIMIT 100';

  console.log('SQL Query:', sql);
  console.log('Params:', params);

  con.query(sql, params, (err, result) => {
    if (err) {
      return res.status(400).json({ "error": err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ "error": "No matching shop found" });
    }

    // JavaScript側でランダムに1件選択
    const randomShop = result[Math.floor(Math.random() * result.length)];
    return res.json(randomShop);
  });
});

app.get('/recommend-shop', (req, res) => {
  const { location, category, genre } = req.query;

  // location, category, genre が未定義または空の場合の処理
  if (!location && !category && !genre) {
    return res.status(400).json({ "error": "At least one of location, category, or genre is required" });
  }

  let sql = 'SELECT * FROM shops WHERE 1=1';
  const params = [];

  if (location && location !== '指定しない') {
    sql += ' AND shopPosition = ?';
    params.push(location);
  }
  if (category && category !== '指定しない') {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (genre && genre !== '指定しない') {
    sql += ' AND genre = ?';
    params.push(genre);
  }

  sql += ' ORDER BY RAND() LIMIT 100';

  con.query(sql, params, (err, result) => {
    if (err) {
      return res.status(400).json({ "error": err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ "error": "No matching shop found" });
    }

    // JavaScript側でランダムに3件選択、重複はしない
    const randomShop = [];
    while (randomShop.length < 3) {
      const shop = result[Math.floor(Math.random() * result.length)];
      if (!randomShop.includes(shop)) {
        randomShop.push(shop);
      }
    }
    return res.json(randomShop);
  });
});

// 新しいお店の情報をデータベースに登録するメソッド
app.post('/add-shop', (req, res) => {
  const { shopName, shopPosition, category, genre, place, shopInfo } = req.body;

  if (!shopName || !shopPosition || !category || !genre || !place || !shopInfo) {
    return res.status(400).json({ "error": "All fields are required" });
  }

  const sql = 'INSERT INTO shops (shopName, shopPosition, category, genre, place, shopInfo) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [shopName, shopPosition, category, genre, place, shopInfo];

  con.query(sql, params, (err, result) => {
    if (err) {
      console.error('Error adding shop:', err);
      return res.status(400).json({ "error": err.message });
    }
    return res.status(201).json({ "message": "Shop added successfully", "shopId": result.insertId });
  });
});

//portを開く
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

