const mockPlay = jest.fn();
jest.mock('sound-play', () => ({
  play: mockPlay,
}));

jest.mock('path', () => ({
  join: () => '/some-path/tela.mp3',
}));

const tela = require('./_tela');

describe('tela command', () => {
  it('calls sound.play with the right path', () => {
    expect(tela.trigger).toBe('tela');

    tela.run();

    expect(mockPlay).toBeCalledWith('/some-path/tela.mp3');
  });
});
