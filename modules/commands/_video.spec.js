const fs = require('fs');
const path = require('path');

const video = require('./_video');

const xmlBuffer = fs.readFileSync(path.join(__dirname, './mocks/_video.stub.xml'));
const mockXml = xmlBuffer.toString('utf8');

jest.mock('node-fetch', () => jest.fn(() => Promise.resolve({
  text: jest.fn(() => Promise.resolve(mockXml)),
})));

describe('video command', () => {
  it('shows the expected message when command runs and latest video is "Criando bots para..."', async () => {
    expect(video.trigger).toBe('video');
    expect(await video.run()).toBe('Assista o meu último vídeo "Criando bots para Twitch com Javascript - Vídeo 01" em https://www.youtube.com/watch?v=cgvlWnAimnE');
  });
});
