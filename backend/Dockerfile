# Node.jsの公式イメージを使用
FROM node:18

# 作業ディレクトリを作成
WORKDIR /usr/src/app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリのコードをコピー
COPY . .

# ポートを公開
EXPOSE 8000

# サーバーを起動
CMD ["node", "app.js"]