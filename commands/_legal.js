const random = require('lodash/random');

module.exports = {
  trigger: 'legal',
  run: ({ user }) => `${user['display-name']} é ${random(1, 100)}% legal`,
};
