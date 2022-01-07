const legal = require('./_legal');

jest.mock('lodash/random', () => jest.fn().mockImplementation(() => 13));

describe('legal command', () => {
  it('shows the expected message when command runs', () => {
    expect(legal.trigger).toBe('legal');
    expect(legal.run({ user: { 'display-name': 'oipanda' } })).toBe('oipanda é 13% legal');
  });
});
