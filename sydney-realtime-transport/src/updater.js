function Updater(action, options, interval = setInterval, stopInterval = clearInterval) {
  let intervalId;
  let onUpdateCallback = () => {};

  async function executeAction() {
    const response = await action();

    if (response && response.length >= 0) {
      response.forEach(onUpdateCallback);
    } else {
      onUpdateCallback(response);
    }
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
