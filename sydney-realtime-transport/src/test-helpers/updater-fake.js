const updaterFake = {
  onStop: () => {},
  onStart: () => {},
  start() {
    this.onStart();
  },
  stop() {
    this.onStop();
  },
  reset() {
    this.onStop = () => {};
    this.onStart = () => {};
  }
};

module.exports = updaterFake;
