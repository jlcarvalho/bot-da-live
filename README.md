# Bot da Live

O Bot da Live foi um bot criado na live [twitch.tv/444jeans](https://www.twitch.tv/444jeans) com o foco em ensinar
conceitos de programação utilizando o bot como um meio. Para a criação do bot foi utilizado Node.js e tmi.js.

## Utilizando o bot

Para baixar o código, execute:

```
git clone git@github.com:jlcarvalho/bot-da-live.git
```

Para rodar o bot, faça uma cópia do arquivo `.env.sample` e salve como `.env` e adicione as variáveis de ambiente requeridas.

`TWITCH_BOT` = Nome do usuário do bot
`TWITCH_TOKEN` = Token de autenticação do bot, pode ser gerado em [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/)
`CHANNEL` = Nome de usuário do canal onde o bot irá rodar

Após configurar as variáveis de ambiente, certique-se de que o Node.js está instalado, navegue até o diretório do projeto e rode:

```
npm install
npm start
```

# Lives

## [Live 1](https://www.twitch.tv/videos/1241757315)

- [x] Criar projeto no [Glitch.com](https://glitch.com/edit/#!/tasty-hilarious-protoceratops)
- [x] Criar conta do bot na Twitch
- [x] Pegar token do bot em [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/)
- [x] Ler mensagens do chat do canal usando o bot
- [x] Identificar comandos entre as mensagens do chat
- [x] Criar comandos (!cafe, !dado, !legal, !patch, !ping, etc.)

## [Live 2](https://www.twitch.tv/videos/1246182038)
- [x] Revisar o que fizemos na live passada
- [x] Configurar um ambiente de dev
  - [x] Instalar o Node.js
  - [x] Instalar o Visual Studio Code
  - [x] Configurar um linter
  - [x] Configurar auto-reload
- [x] Organizar o código
- [x] Criar comandos novos (!tela, !d6), alguns usando expressão regular

## [Live 3](https://www.twitch.tv/videos/1248226005)
- [x] Começar a usar uma ferramenta de versionamento de código (git)
- [x] Descrever como usar o bot no README.md
- [x] Implementar git hooks para rodar o linter
- [ ] Implementar testes automatizados