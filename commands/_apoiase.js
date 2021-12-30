const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.setRequestInterception(true);

  // page.on('request', (request) => {
  //   if (request.resourceType() === 'image') request.abort();
  //   else request.continue();
  // });

  // page.on('response', async (response) => {
  //   const request = response.request();

  //   if (request.url().includes('public-supporters')) {
  //     const json = await response.json();
  //     console.log(json);
  //   }
  // });

  await page.goto('https://apoia.se/uaiti');

  await page.waitForSelector('[ng-controller="CampaignViewController"]');
  await page.waitForSelector('.profile-bar .profile-menu .profile-tab-opener:nth-child(4)', { visible: true });

  const cookies = await page.cookies();
  const xsrfToken = cookies.find(({ name }) => name === 'XSRF-TOKEN');

  await browser.close();

  const res = await fetch('https://apoia.se/api/v1/users/public-supporters', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'no-cache',
      'content-type': 'application/json;charset=UTF-8',
      pragma: 'no-cache',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-xsrf-token': xsrfToken,
    },
    referrer: 'https://apoia.se/uaiti',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: '{"campaignId":"617dbf16fd357b09e77c0de0","limit":80,"skip":0}',
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  });
  console.log(await res.text());

  // await browser.close();
};
const frequency = 10000;

module.exports = {
  run,
  frequency,
};
