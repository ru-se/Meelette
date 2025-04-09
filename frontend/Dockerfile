# ベースイメージとしてNode.jsを使用
FROM node:18 AS build

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# Nginxを使用してビルドされたアプリケーションを提供
FROM nginx:alpine

# 修正: `nginx.conf` を `/etc/nginx/nginx.conf` にコピー
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# 正しいパスを指定（frontendディレクトリ内にnginx.confがある場合）
COPY ./frontend/nginx.conf /etc/nginx/nginx.conf

# `conf.d/` ディレクトリに `default.conf` を作成
RUN echo 'server { listen 80; server_name localhost; location / { root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
