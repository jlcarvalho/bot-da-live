const fetch = require('node-fetch');
const { parseStringPromise } = require('xml2js');

module.exports = {
  trigger: 'video',
  run: async () => {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${process.env.YOUTUBE_CHANNEL}`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    });

    const feedRss = await response.text();
    const { feed } = await parseStringPromise(feedRss);

    const lastVideo = feed.entry[0];
    const lastVideoTitle = lastVideo.title[0];
    const lastVideoUrl = lastVideo.link[0].$.href;

    return `Assista o meu último vídeo "${lastVideoTitle}" em ${lastVideoUrl}`;
  },
};
