function Updater(action, options, interval = setInterval, stopInterval = clearInterval) {
  let intervalId;
  let onUpdateCallback = () => {};
  let onError = () => {};

  async function executeAction() {
    let response;

    try {
      response = await action();
    } catch (err) {
      onError(err);
      return;
    }

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
    },
    onError(callback) {
      onError = callback;
    }
  };
}

module.exports = Updater;
