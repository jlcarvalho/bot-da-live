// Commands
const cafe = require('./_cafe');
const dado = require('./_dado');
const legal = require('./_legal');
const patch = require('./_patch');
const ping = require('./_ping');
const tela = require('./_tela');

// Timers
const agua = require('./_agua');
// const apoiase = require('./_apoiase');

const commands = [
  cafe,
  dado,
  legal,
  patch,
  ping,
  tela,
];

commands.push({
  trigger: 'comandos',
  run: () => commands.map(({ trigger, alias }) => (typeof trigger === 'string' ? `!${trigger}` : alias)).sort().join(', '),
});

const timers = [
  agua,
  // apoiase,
];

module.exports = {
  commands,
  timers,
};
