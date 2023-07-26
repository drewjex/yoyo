// 👉 Run "./connect" in the terminal to get started
class Bot {
  constructor(config) {
    this.config = config;
    console.log("Hello world!", this.config);
  }

  move(board) {
    console.log(board); // 3x3 array with values "x" or "o" or "empty"

    // Return the spot you'd like to move here.
    // x should be an integer between 0 and 2
    // y should be an integer between 0 and 2
    return { x: 0, y: 0 };
  }

  end(board) {
    console.log("Good game!");
  }
}

module.exports.Bot = Bot;
