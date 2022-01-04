module.exports = {
  trigger: 'ping',
  run: ({ user }) => `pong ${user['display-name']} 😁`,
};
