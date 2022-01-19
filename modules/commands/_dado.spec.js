const mockRandom = jest.fn(() => 4);
jest.mock('lodash/random', () => mockRandom);

const dado = require('./_dado');

describe('dado command', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('has the right trigger', () => {
    expect(dado.trigger.test('test')).toBe(false);
    expect(dado.trigger.test('dado')).toBe(false);
    expect(dado.trigger.test('')).toBe(false);
    expect(dado.trigger.test('dado6')).toBe(false);
    expect(dado.trigger.test('d6')).toBe(true);
    expect(dado.trigger.test('d20')).toBe(true);
    expect(dado.trigger.test('d500')).toBe(true);
  });

  it('returns the right message when command trigger is d6', async () => {
    const response = await dado.run({ user: { 'display-name': 'oipanda' }, message: 'd6' });

    expect(response).toBe('oipanda tirou o número: 4');
    expect(mockRandom).toBeCalledWith(1, 6);
  });

  it('returns the right message when command trigger is d20', async () => {
    const response = await dado.run({ user: { 'display-name': 'oipanda' }, message: 'd20' });

    expect(response).toBe('oipanda tirou o número: 4');
    expect(mockRandom).toBeCalledWith(1, 20);
  });
});
