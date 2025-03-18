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

//portを開く
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

