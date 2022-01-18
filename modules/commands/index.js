const cafe = require('./_cafe');
const dado = require('./_dado');
const legal = require('./_legal');
const patch = require('./_patch');
const ping = require('./_ping');
const tela = require('./_tela');
const video = require('./_video');

const commands = [
  cafe,
  dado,
  legal,
  patch,
  ping,
  tela,
  video,
];

commands.push({
  trigger: 'comandos',
  run: () => commands.map(({ trigger, alias }) => (typeof trigger === 'string' ? `!${trigger}` : alias)).sort().join(', '),
});

const Commands = ({ client, db }) => {
  // Comandos
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
      // eslint-disable-next-line
      console.log('Função run não definida!');
    }
  });
};

module.exports = Commands;
