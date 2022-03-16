# Realtime chat | MERN Chat 

![Captura de pantalla (36)](https://user-images.githubusercontent.com/77751686/158532748-e0e16cdc-c313-4141-be63-6c721447a156.png)

## ¡Important!
You must have [Node.js](https://nodejs.org/en/) and the [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) package manager installed on your system to use the project

## Clone project

```
git clone https://github.com/LancerR40/realtime-chat.git 
```

## Installing dependencies

### Client

```
cd ./realtime-chat/client
yarn
```

### Server

```
cd ./realtime-chat/server
yarn
```

## .env file server configuration
The server uses [Cloudinary](https://cloudinary.com/home-3722?utm_campaign=Abrand&utm_content=546430838637&utm_medium=search&utm_source=google&utm_term=cloudinary) to store images and [MongoDB Cloud](https://account.mongodb.com/account/login) as databases, in the .env.example file the requested data must be filled in.

## Start the application on the client

```
cd ./realtime-chat/client
yarn dev
```

## Then, start the application on the server

```
cd ./realtime-chat/server
yarn dev
```
