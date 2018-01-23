const request = require('request');
const eventsource = require('eventsource');

function MessageBus(
  host,
  httpClient = request,
  EventSource = eventsource
) {
  const listeners = {};
  const errorListeners = [];

  function onMessageReceived(message) {
    const data = JSON.parse(message.data);
    if (listeners[data.name]) {
      listeners[data.name](data);
    }
  }

  function onConnectionError(error) {
    errorListeners.forEach((listener) => {
      listener(error);
    });
  }

  function connect() {
    const eventSource = new EventSource(`${host}/sub`);
    eventSource.onmessage = onMessageReceived;
    eventSource.onerror = onConnectionError;
  }

  function publish(message) {
    httpClient.post({
      url: `${host}/pub`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      form: JSON.stringify(message)
    });
  }

  function subscribe(messageType, callback) {
    listeners[messageType] = callback;
  }

  function onError(callback) {
    errorListeners.push(callback);
  }

  return {
    publish,
    subscribe,
    connect,
    onError
  };
}

module.exports = MessageBus;

