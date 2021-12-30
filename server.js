require('dotenv').config();

const tmi = require('tmi.js');
const cron = require('node-cron');
const levelup = require('levelup');
const leveldown = require('leveldown');

const { commands, timers } = require('./commands');

const db = levelup(leveldown('./mydb'));

const client = new tmi.Client({
  channels: ['444jeans'],
  identity: {
    username: 'CriaDoFourzinho',
    password: process.env.TWITCH_TOKEN,
  },
});

client.connect();

client.on('message', async (channel, user, message, self) => {
  if (self || !message.startsWith('!')) return;

  const strippedMessage = message.slice(1);

  const command = commands.find(
    ({ trigger }) => (typeof trigger === 'string'
      ? trigger === strippedMessage
      : trigger.test(strippedMessage)),
  );

  if (!command) return;

  try {
    const response = await command.run({ user, message: strippedMessage, db });

    if (!response) return;

    client.say(channel, response);
  } catch (e) {
    console.log('Função run não definida!');
  }
});

timers.forEach((timer) => {
  cron.schedule(`*/${timer.frequency} * * * *`, async () => {
    const response = await timer.run({ db });

    if (!response) return;

    client.say('444jeans', response);
  });
});
