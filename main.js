import puppeteer from "puppeteer";
import path from "path";
import sleep from "sleep";

const main = async () => {
  const source = path.join(path.resolve("."), "dist", "index.html");

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--use-fake-device-for-media-stream",
      "--use-fake-ui-for-media-stream=1",
    ],
  });
  const page = await browser.newPage();
  await page.goto(`file://${source}`);

  await page.evaluate(`window.createRoom(
  "meet.jit.si",
  "testing-room-for-bot",
  "room-creation-bot",
  "secure"
);`);

  sleep.sleep(20);

  await browser.close();
};

main();
