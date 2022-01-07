const fetch = require('node-fetch');

module.exports = {
  trigger: 'patch',
  run: async () => {
    const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    });

    const versions = await response.json();
    const [majorVersion, minorVersion] = versions[0].split('.');

    return `As notas de atualização do patch ${majorVersion}.${minorVersion} são https://teamfighttactics.leagueoflegends.com/pt-br/news/game-updates/notas-da-atualizacao-${majorVersion}-${minorVersion}-do-teamfight-tactics/`;
  },
};
