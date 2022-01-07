const generateVersionMock = (mockVersions) => {
  jest.doMock('node-fetch', () => jest.fn(() => Promise.resolve({
    json: jest.fn(() => Promise.resolve(mockVersions)),
  })));
};

describe('patch command', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('shows the expected message when command runs and latest version is 12.1.1', async () => {
    generateVersionMock([
      '12.1.1',
      '11.24.1',
    ]);

    // eslint-disable-next-line global-require
    const patch = require('./_patch');

    expect(patch.trigger).toBe('patch');
    expect(await patch.run()).toBe('As notas de atualização do patch 12.1 são https://teamfighttactics.leagueoflegends.com/pt-br/news/game-updates/notas-da-atualizacao-12-1-do-teamfight-tactics/');
  });

  it('shows the expected message when command runs and latest version is 11.24.1', async () => {
    generateVersionMock([
      '11.24.1',
      '11.23.1',
    ]);

    // eslint-disable-next-line global-require
    const patch = require('./_patch');

    expect(patch.trigger).toBe('patch');
    expect(await patch.run()).toBe('As notas de atualização do patch 11.24 são https://teamfighttactics.leagueoflegends.com/pt-br/news/game-updates/notas-da-atualizacao-11-24-do-teamfight-tactics/');
  });
});
