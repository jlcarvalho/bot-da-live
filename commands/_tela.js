const sound = require('sound-play');
const path = require('path');

const filePath = path.join(__dirname, '../assets/oia-tela.mp3');

module.exports = {
  trigger: 'tela',
  run: () => {
    sound.play(filePath);
  },
};
