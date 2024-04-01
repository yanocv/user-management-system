# 使い方

## セットアップ

### リポジトリをクローン

```
// 任意のフォルダにて
git clone git@github.com:div-dev-secure/web-basic-exam-frontend_api.git
```

### npm パッケージをインストール

```
cd web-basic-exam-frontend_api
yarn
```

### 初回起動及び初期化したい時

package.json の scripts 内を参照  

```
// DBが初期化されて起動し、初期データが登録される
yarn start:reset
// 処理が終わったら一旦 ctrl + c で停止する
// 次からは↓で起動する
yarn start
```

### ２回目以降の起動

package.json の scripts 内を参照  

```
// プロジェクト内に保存された management.sqlite データベースに接続して起動
yarn start
```

## プロジェクト仕様

### 基本
- Node.js
- TypeScript
- Express

### DB系
- SQLite
- sequelize

### 時間系
- moment

### ローカルサーバー
- nodemon
- ts-node

### HTTP通信
- axios
