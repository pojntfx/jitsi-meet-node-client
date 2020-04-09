import puppeteer from "puppeteer";
import path from "path";

export default class {
  async open() {
    const source = path.join(__dirname, "..", "dist", "index.html");

    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        "--use-fake-device-for-media-stream",
        "--use-fake-ui-for-media-stream=1",
      ],
    });
    this.page = await this.browser.newPage();
    await this.page.goto(`file://${source}`);
  }

  async createRoom(domain, roomName, botName, password) {
    await this.page.evaluate(`window.createRoom(
  "${domain}",
  "${roomName}",
  "${botName}",
  "${password}"
);`);
  }

  async close() {
    return this.browser.close();
  }
}
