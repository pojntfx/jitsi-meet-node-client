const puppeteer = require("puppeteer");
const path = require("path");

/**
 * A Jitsi client
 */
module.exports = class {
  /**
   * Opens the browser/WebRTC node
   */
  async open() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        "--use-fake-device-for-media-stream",
        "--use-fake-ui-for-media-stream=1",
      ],
    });
  }

  /**
   * Create a new room
   * @param {string} domain Jitsi domain to use
   * @param {string} roomName Room to create
   * @param {string} botName Name of the bot to use to change the password
   * @param {string} password Password to set
   * @param {string} keepAlive Amount of time (in seconds) to stay on page
   */
  async createRoom(domain, roomName, botName, password, keepAlive) {
    const source = path.join(__dirname, "..", "dist", "index.html");

    const page = await this.browser.newPage();
    await page.goto(`file://${source}`);

    await page.evaluate(`window.createRoom(
  "${domain}",
  "${roomName}",
  "${botName}",
  "${password}"
);`);

    await new Promise((resolve) =>
      setInterval(() => resolve(), 1000 * keepAlive)
    );

    return await page.close();
  }

  /**
   * Closes the browser/WebRTC node
   */
  async close() {
    return this.browser.close();
  }
};
