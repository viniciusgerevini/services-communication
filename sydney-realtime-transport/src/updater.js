function Updater(action, options, interval = setInterval, stopInterval = clearInterval) {
  let intervalId;
  let onUpdateCallback = () => {};

  async function executeAction() {
    onUpdateCallback(await action());
  }

  return {
    start() {
      executeAction();
      intervalId = interval(executeAction, options.interval);
    },
    stop() {
      stopInterval(intervalId);
    },
    onUpdate(callback) {
      onUpdateCallback = callback;
    }
  };
}

module.exports = Updater;
