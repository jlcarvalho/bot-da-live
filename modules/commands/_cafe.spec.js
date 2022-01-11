const levelup = require('levelup');
const memdown = require('memdown');

const cafe = require('./_cafe');

describe('cafe command', () => {
  it('has the right trigger', () => {
    expect(cafe.trigger.test('acafé')).toBe(false);
    expect(cafe.trigger.test('caféé')).toBe(false);
    expect(cafe.trigger.test('')).toBe(false);
    expect(cafe.trigger.test('pinga')).toBe(false);
    expect(cafe.trigger.test('café')).toBe(true);
    expect(cafe.trigger.test('cafe')).toBe(true);
  });

  it('returns the right message', async () => {
    const db = levelup(memdown());

    expect(await cafe.run({ db })).toBe('Jeans já tomou 1 café');
    expect(await cafe.run({ db })).toBe('Jeans já tomou 2 cafés');
  });
});
