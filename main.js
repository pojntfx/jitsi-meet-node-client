import Jitsi from "./src/jitsi";
import sleep from "sleep";

const main = async () => {
  const jitsi = new Jitsi();

  await jitsi.open();

  const domain = process.env.JITSI_DOMAIN;
  const roomName = process.env.JITSI_ROOM_NAME;
  const botName = process.env.JITSI_BOT_NAME;
  const password = process.env.JITSI_ROOM_PASSWORD;
  const sleepTime = process.env.JITSI_SLEEP_TIME;

  await jitsi.createRoom(domain, roomName, botName, password);

  await sleep.sleep(sleepTime);

  await jitsi.close();
};

main();
