const EventEmitter = require('events');
const flushPromises = require('flush-promises');

const Commands = require('./index');

jest.mock('./_cafe', () => ({
  alias: '!cafe, !café',
  trigger: /^caf(e|é)$/,
  run: jest.fn().mockReturnValue('some command response'),
}));

jest.mock('./_dado', () => ({
  trigger: 'dado',
  run: jest.fn().mockReturnValue('some command response'),
}));

jest.mock('./_legal', () => ({
  trigger: 'legal',
  run: jest.fn().mockReturnValue('some command response'),
}));

jest.mock('./_patch', () => ({
  trigger: 'patch',
  run: jest.fn().mockImplementation(() => {
    throw new Error('some-error');
  }),
}));

jest.mock('./_ping', () => ({
  trigger: 'ping',
  run: jest.fn().mockReturnValue('some command response'),
}));

jest.mock('./_tela', () => ({
  trigger: 'tela',
  run: jest.fn().mockReturnValue(undefined),
}));

jest.mock('./_video', () => ({
  trigger: 'video',
  run: jest.fn().mockReturnValue('some command response'),
}));

const say = jest.fn();

class TwitchEmitter extends EventEmitter {
  say = say;
}

describe('Commands', () => {
  let client;

  beforeEach(() => {
    jest.clearAllMocks();

    client = new TwitchEmitter();

    Commands({
      client,
      db: 'some-db-instance',
    });
  });

  it('does nothing when self is true', async () => {
    const channel = '444jeans';
    const user = { 'display-name': 'criadofourzinho' };
    const message = '!ping';
    const self = true;

    client.emit('message', channel, user, message, self);

    await flushPromises();

    expect(say).not.toBeCalled();
  });

  it('does nothing when message does not start with !', async () => {
    const channel = '444jeans';
    const user = { 'display-name': 'criadofourzinho' };
    const message = 'ping';
    const self = false;

    client.emit('message', channel, user, message, self);

    await flushPromises();

    expect(say).not.toBeCalled();
  });

  it('does nothing when command does not exists', async () => {
    const channel = '444jeans';
    const user = { 'display-name': 'criadofourzinho' };
    const message = '!comando-inexistente';
    const self = false;

    client.emit('message', channel, user, message, self);

    await flushPromises();

    expect(say).not.toBeCalled();
  });

  it('runs command when command is found', async () => {
    const channel = '444jeans';
    const user = { 'display-name': 'cezarpretto' };
    const message = '!ping';
    const self = false;

    client.emit('message', channel, user, message, self);

    await flushPromises();

    expect(say).toBeCalledWith('444jeans', 'some command response');
  });

  it('runs command when command is found and trigger is a regex', async () => {
    const channel = '444jeans';
    const user = { 'display-name': 'cezarpretto' };
    const message = '!café';
    const self = false;

    client.emit('message', channel, user, message, self);

    await flushPromises();

    expect(say).toBeCalledWith('444jeans', 'some command response');
  });

  it('runs command that does not says something', async () => {
    const channel = '444jeans';
    const user = { 'display-name': 'cezarpretto' };
    const message = '!tela';
    const self = false;

    client.emit('message', channel, user, message, self);

    await flushPromises();

    expect(say).not.toBeCalled();
  });

  it('logs on console when there is some command error', async () => {
    jest.spyOn(global.console, 'log');

    const channel = '444jeans';
    const user = { 'display-name': 'cezarpretto' };
    const message = '!patch';
    const self = false;

    client.emit('message', channel, user, message, self);

    await flushPromises();

    // eslint-disable-next-line
    expect(console.log).toBeCalledWith('Função run não definida!');
  });

  it('generate command !comandos with listing all other commands', async () => {
    const channel = '444jeans';
    const user = { 'display-name': 'cezarpretto' };
    const message = '!comandos';
    const self = false;

    client.emit('message', channel, user, message, self);

    await flushPromises();

    expect(say).toBeCalledWith('444jeans', '!cafe, !café, !comandos, !dado, !legal, !patch, !ping, !tela, !video');
  });
});
