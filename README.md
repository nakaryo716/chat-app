# chat-app-server
## Overview
WebSocket通信を使用したリアルタイムチャットアプリケーション  
NextJsを使用し、サーバーサイドは[chat-app-server](https://github.com/nakaryo716/chat-app-server)を使用しています。  
## Getting Started
### Prerequisites
以下のソフトウェアが必要です:
- [Docker](https://www.docker.com/)
### Installation And Run
1. リポジトリをクローンします:
    ```bash
    git clone https://github.com/nakaryo716/chat-app
    cd chat-app
    ```
2. SSL証明書の作成を行います:  
```./nginx/ssl/README.md```を参照し、OpenSSLを使用して証明書を作成します。
3. Dockerコンテナを立ち上げます:  
    ```bash
    docker compose up
    ```
4. nginx, next-appコンテナが起動し、使用可能になります。デフォルトではhttps://localhostでアクセス可能です。  
ポートを変更したい場合は```compose.yaml```の```port```を変更してください。  
nginxのリバースプロキシによって```https://localhost:443``` >> ```http://localhost:3000```にリダイレクトされています。  
port
    ```
    container name: port
    ------------------------
    nginx         : 443, 180
    app           : 3000
    ```
## Communicate with WebSocket Server
認証やWebSocket通信などのサーバーサイドの実装は以下のリポジトリから取得し、実行することができます。  
[chat-app-server](https://github.com/nakaryo716/chat-app-server)リポジトリのclone
```bash
git clone https://github.com/nakaryo716/chat-app-server
```
```bash
cd chat-app
```
dockerコンテナの起動
```
docker compose up
```
詳しい起動の仕方については[README.md](https://github.com/nakaryo716/chat-app-server/blob/main/README.md)を参照してください。

## License
このプロジェクトは MIT ライセンスに基づいてライセンスされています。詳細については、LICENSE ファイルを参照してください。
