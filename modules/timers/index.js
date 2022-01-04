const cron = require('node-cron');

const agua = require('./_agua');

const timers = [
  agua,
];

const Timers = ({ client, db }) => {
  timers.forEach((timer) => {
    cron.schedule(`*/${timer.frequency} * * * *`, async () => {
      const response = await timer.run({ db });

      if (!response) return;

      client.say(process.env.CHANNEL, response);
    });
  });
};

module.exports = Timers;
