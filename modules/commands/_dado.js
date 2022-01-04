const random = require('lodash/random');

const trigger = /^d(?<quantity>\d+)$/;

module.exports = {
  alias: '!d6, !d20, !d100',
  trigger,
  run: ({ user, message }) => {
    const { quantity } = message.match(trigger).groups;

    return `${user['display-name']} tirou o número: ${random(1, parseInt(quantity, 10))}`;
  },
};
