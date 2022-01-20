const path = require('path');

const Alerts = ({ client, app, io }) => {
  app.get('/alerts', (req, res) => {
    res.sendFile(path.join(__dirname, '../../assets/alerts.html'));
  });

  io.on('connection', (socket) => {
    client.on('subscription', (channel, username) => {
      client.say(channel, `Obrigado pelo sub ${username}!!!`);
      socket.emit('subscription', { username });
    });

    client.on('resub', (channel, username, months) => {
      client.say(channel, `Obrigado pelo resub de ${months} meses ${username}!!!`);
      socket.emit('resub', { username, months });
    });

    client.on('cheer', (channel, user) => {
      client.say(channel, `Obrigado pelos ${user.bits} bits ${user['display-name']}!!!`);
      socket.emit('cheer', { username: user['display-name'], bits: user.bits });
    });

    client.on('raided', (channel, username) => {
      client.say(channel, `Obrigado pela raid ${username}, sejam todos bem vindos!`);
      socket.emit('resub', { username });
    });
  });
};

module.exports = Alerts;
