const mockTMIClientConnect = jest.fn();
const mockTMIClient = jest.fn().mockReturnValue({ connect: mockTMIClientConnect });

const mockLevelUp = jest.fn();
const mockLevelDown = jest.fn().mockReturnValue('leveldown-mock');

const mockExpressUse = jest.fn();
const mockExpress = jest.fn().mockReturnValue({ use: mockExpressUse });
mockExpress.static = jest.fn().mockReturnValue('express-static-mock');

const mockHttpListen = jest.fn();
const mockHttpCreateServer = jest.fn().mockReturnValue({ listen: mockHttpListen });

const mockSocketIOServer = jest.fn();

const mockCommandsModule = jest.fn();
const mockTimersModule = jest.fn();
const mockAlertsModule = jest.fn();

jest.mock('tmi.js', () => ({ Client: mockTMIClient }));
jest.mock('levelup', () => mockLevelUp.mockReturnValue('mydb'));
jest.mock('leveldown', () => mockLevelDown);
jest.mock('socket.io', () => ({ Server: mockSocketIOServer }));
jest.mock('express', () => mockExpress);
jest.mock('http', () => ({ createServer: mockHttpCreateServer }));

jest.mock('./modules/commands', () => mockCommandsModule);
jest.mock('./modules/timers', () => mockTimersModule);
jest.mock('./modules/alerts', () => mockAlertsModule);

describe('server', () => {
  beforeAll(() => {
    // eslint-disable-next-line global-require
    require('./server');
  });

  it('initializes aplication', () => {
    const client = mockTMIClient();
    const db = 'mydb';
    const app = mockExpress();
    const server = mockHttpCreateServer();

    expect(mockLevelUp).toBeCalledWith('leveldown-mock');
    expect(mockLevelDown).toBeCalledWith('./mydb');

    expect(mockExpress).toBeCalled();

    expect(mockHttpCreateServer).toBeCalledWith(app);

    expect(mockSocketIOServer).toBeCalledWith(server);

    expect(mockExpress.static).toBeCalledWith('assets');
    expect(mockExpressUse).toBeCalledWith('express-static-mock');

    expect(mockTMIClient).toBeCalledWith({ channels: ['444jeans'], identity: { password: 'oauth:123', username: 'CriaDoFourzinho' } });
    expect(mockTMIClientConnect).toBeCalled();

    expect(mockCommandsModule).toBeCalledWith({ client, db });
    expect(mockTimersModule).toBeCalledWith({ client, db });
    expect(mockAlertsModule).toBeCalledWith({
      client,
      app,
      io: new mockSocketIOServer(), // eslint-disable-line new-cap
    });

    expect(mockHttpListen.mock.calls[0][0]).toBe(3000);
  });
});
