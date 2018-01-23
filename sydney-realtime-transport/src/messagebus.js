const request = require('request');
const eventsource = require('eventsource');

function MessageBus(
  host,
  httpClient = request,
  EventSource = eventsource
) {
  const listeners = {};

  function onMessageReceived(message) {
    const data = JSON.parse(message.data);
    if (listeners[data.name]) {
      listeners[data.name](data);
    }
  }

  function connect() {
    const eventSource = new EventSource(`${host}/sub`);
    eventSource.onmessage = onMessageReceived;
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

  return { publish, subscribe, connect };
}

module.exports = MessageBus;

