// ⚠️ Only modify this file if you know what you're doing!
const { Bot } = require("./bot");

function send(channel, botInstanceId, payload) {
  let message = `\n<<zilch>>.${channel}`;

  if (botInstanceId) {
    message += "." + botInstanceId;
  }

  if (payload) {
    message += "." + payload;
  }

  message += "\n";

  process.stderr.write(message);
}

function parseBoard(board) {
  return board.split("|").map((row) => row.split(","));
}

const bots = new Map();

process.stdin.on("data", async (chunk) => {
  const data = chunk.toString().trim();
  const [channel, botInstanceId] = data.split(".", 2);
  const payload = data.slice(channel.length + botInstanceId.length + 2);

  if (channel === "start") {
    const standardCustomConfigSplit = payload.indexOf(".");
    const standardConfigParts = payload
      .slice(0, standardCustomConfigSplit)
      .split(",");

    const config = {
      botInstanceId,
      gameTimeLimit: parseInt(standardConfigParts[0]),
      turnTimeLimit: parseInt(standardConfigParts[1]),
      player: standardConfigParts[2] === "0" ? "x" : "o",
      startingPosition: parseBoard(
        payload.slice(standardCustomConfigSplit + 1)
      ),
    };

    bots.set(botInstanceId, new Bot(config));

    send("start", botInstanceId);
    return;
  }

  const bot = bots.get(botInstanceId);

  if (!bot) {
    throw new Error("No bot runner with id " + botInstanceId);
  }

  if (channel === "move") {
    const move = await bot.move(parseBoard(payload));
    send("move", botInstanceId, `${move.x},${move.y}`);
    return;
  }

  if (channel === "end") {
    await bot.end(parseBoard(payload));
    bots.delete(botInstanceId);
    return;
  }
});

send("ready");
