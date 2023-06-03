// @ts-check
const { test, expect } = require('@playwright/test');


test.describe('Check count of clicks', () => {
  test('go to dashboard and generate a click', async({ browser, request}) => {
    test.setTimeout(100000);

    // const browser = await chromium.launch({headless: false});
    const browserContext = await browser.newContext();
    const mainPage = await browserContext.newPage();
    const secPage = await browserContext.newPage();

    try {
      const cookies = await setCookieVals();
      await browserContext.addCookies(cookies);

      await mainPage.goto('https://stripcash.com/overview/dashboard');
      await expect(mainPage).toHaveTitle('Dashboard | Stripcash');

      await mainPage.goto('https://stripcash.com/analytics/statistics');

      await expect(mainPage).toHaveTitle('Statistics | Stripcash');

      const reportButtonXPATH = '//html/body/div/div/div/div/section/div[1]/div[2]/form/div/div/div/div[4]/div[2]/button';

      const clicksXPATH =  '//html/body/div/div/div/div/section/div[1]/div[2]/div/div[2]/div/div/div[1]/div/div[2]/div[2]/div/div[2]/div/span';

      await mainPage.locator(reportButtonXPATH).click();

      const initialClicksCount = Number(await mainPage.locator(clicksXPATH).textContent());
      console.log(initialClicksCount);

      await secPage.goto('https://go.xlirdr.com?userId=7137f282d4856da74b7400ae348f4ed29ea3c64c42112e87f36a1f350c26d7b4', {waitUntil: 'domcontentloaded'});
      await secPage.bringToFront();

      await mainPage.bringToFront();

      // тут мне пришлось несколько раз перезагрузить страницу и снова генерировать репорт, т.к. данные в отчете далеко не сразу обновляются
      // в Playwright нет что-то типа .sleep и поэтому такой костыльный подход получился здесь
      // можно было оставить без нескольких релоадов и генераций репорта, но тогда бы тест всегда падал ибо данные не успевали апдейтнуться

      await mainPage.reload();

      await mainPage.locator(reportButtonXPATH).click();

      await mainPage.reload();

      await mainPage.locator(reportButtonXPATH).click();

      await mainPage.reload();

      await mainPage.locator(reportButtonXPATH).click();

      await mainPage.reload();

      await mainPage.locator(reportButtonXPATH).click();
      
      await mainPage.reload();

      await mainPage.locator(reportButtonXPATH).click();

      const finalClicksCount = Number(await mainPage.locator(clicksXPATH).textContent());
      console.log(finalClicksCount);

      test.fail(initialClicksCount >= finalClicksCount);

    } catch (err) {
      console.log(err);
    }finally {
      await browserContext.close();
    }
  });
});



export async function setCookieVals() {

  const cookies = [
      {name: '_sessionId', value: '4ea7e66008c69ede4ffff65cdf77e8703ec0a1a34d23e293d91c849f85e9', path: '/', domain: '.api.stripcash.com'},
      {name: '7ed8dc7490e7ff965fa82bb18473bb4f', value: 'ee120ed586363e9d264a3778fb9b38c1', path: '/', domain: 'api.stripcash.com'},
    {name: '766008fc4d75f5b462d364eca4127792', value: '0c5edd2e4d5047addad785ceba1f8dbb', path: '/', domain: 'api.stripcash.com'},
    {name: '7923f11cc908ebf747210658493b3d04', value: '292d26eb73356235fc7a316ebddc46fe', path: '/', domain: 'api.stripcash.com'},
    {name: '_sessionRemember', value: '1', path: '/', domain: '.api.stripcash.com'},
    {name: 'b3dceb93f76f7a780b37d1d2f63e6b97', value: 'b3dceb93f76f7a780b37d1d2f63e6b97', path: '/', domain: 'api.stripcash.com'},
    {name: '_ga', value: 'GA1.2.1769715886.1685711404', path:'/', domain: '.stripcash.com'},
    {name: '_ga_ZZ6BRWMSSC', value: 'GS1.1.1685782597.2.1.1685783360.0.0.0', path: '/', domain: '.stripcash.com'},
    {name: '_gid', value: 'GA1.2.844190262.1685711404', path: '/', domain: '.stripcash.com'},
    {name: 'f721927faabc21d07da6dae8de22a1f3', value: '07c0815e2dd3429e50e4f1afa97dfdcc', path:'/', domain: 'stripcash.com'},
    {name: 'e20656dcaafca1b10ef9419c30dcba94', value: '6a865b2c4283ad11c885a4ced4b5a4f7', path: '/', domain: 'stripcash.com'}
  ]
  return cookies;
}
