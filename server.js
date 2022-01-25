require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const tmi = require('tmi.js');
const levelup = require('levelup');
const leveldown = require('leveldown');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const Commands = require('./modules/commands');
const Timers = require('./modules/timers');
const Alerts = require('./modules/alerts');

const db = levelup(leveldown('./mydb'));

// Configurações de servidor http e sockets
const SERVER_PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('assets'));

// Configurações de conexão do chat da Twitch
const client = new tmi.Client({
  channels: [process.env.CHANNEL],
  identity: {
    username: process.env.TWITCH_BOT,
    password: process.env.TWITCH_TOKEN,
  },
});

client.connect();

// Instanciamento dos "módulos" do bot
Commands({ client, db });
Timers({ client, db });
Alerts({ client, app, io });

server.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
