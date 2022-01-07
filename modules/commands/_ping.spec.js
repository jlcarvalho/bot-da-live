const ping = require('./_ping');

describe('ping command', () => {
  it('pongs', () => {
    expect(ping.trigger).toBe('ping');
    expect(ping.run({ user: { 'display-name': 'oipanda' } })).toBe('pong oipanda 😁');
    expect(ping.run({ user: { 'display-name': 'ShadesOfBlue' } })).toBe('pong ShadesOfBlue 😁');
  });
});
