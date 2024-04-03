# Usage

## Setup

### Clone the Repository

```
// In any folder
git clone https://github.com/yanocv/user-management-system.git
```

### Install npm Packages

```
cd user-management-system\server
npm install
```

### Initial Setup and Initialization

Refer to the scripts section in package.json. 

```
// Initializes the database and starts the server with initial data registration
npm run start:reset

// After the process finishes, stop with ctrl + c
// Subsequent startups can be done with the following command
npm start
```

Download the precompiled binaries from the SQLite website: https://www.sqlite.org/download.html
Choose the appropriate version based on your Windows architecture (32-bit or 64-bit) - sqlite-tools-win32-x86-3400100
Extract the downloaded zip file.
Copy the extracted files to a directory in your system's PATH, such as C:\Windows.
Open terminal, and set the path: `$env:PATH += ";C:\sqlite-tools-xxx-xxx-xxxxx"`
Example: `$env:PATH += ";C:\sqlite-tools-win32-x86-3400100"`

Open terminal, go to the server directory, and connect to SQLite with the following command: `sqlite3 src\database\management.sqlite`
Then, retrieve the application ID: `SELECT application_id FROM app ORDER BY modified DESC LIMIT 1;`
Copy the ID, and paste it in: client/env/dev.js/applicationID: xxxx

Install: npm install ts-node nodemon --save-dev


### Subsequent Startups

Refer to the scripts section in package.json.  

```
// Connects to the management.sqlite database stored in the project and starts the server
npm start
```

