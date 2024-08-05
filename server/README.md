# Usage

## Setup

### Clone the Repository

```
// In any folder
git clone https://github.com/yanocv/user-management-system.git
```

### Install npm Packages

```
// Go to the server directory
cd user-management-system\server

// Install dependencies
npm install
npm install ts-node nodemon --save-dev
```

### Initial Setup and Initialization

Refer to the scripts section in package.json.

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

### DB 系

- SQLite
- sequelize

### 時間系

- moment

### ローカルサーバー

- nodemon
- ts-node

### HTTP 通信

- axios
