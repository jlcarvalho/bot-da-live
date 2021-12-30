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
    const latestVersion = versions[0].slice(0, 5);

    return `As notas de atualização do patch ${latestVersion} são https://teamfighttactics.leagueoflegends.com/pt-br/news/game-updates/notas-da-atualizacao-${latestVersion.replace('.', '-')}-do-teamfight-tactics/`;
  },
};
