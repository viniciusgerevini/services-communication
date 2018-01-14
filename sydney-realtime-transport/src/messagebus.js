function MessageBus(
  host,
  httpClient = require('request'),
  EventSource = require('eventsource')
) {
  const eventSource = new EventSource(`${host}/sub`);
  let listeners = {};

  eventSource.onmessage = (message) => {
    if (listeners[message.name])  {
      listeners[message.name](message);
    }
  };

  function publish(message) {
    httpClient.post({
      url: `${host}/pub`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      form: message
    });
  }

  function subscribe(messageType, callback) {
    listeners[messageType] = callback;
  }

  return { publish, subscribe }
}

module.exports = MessageBus;

