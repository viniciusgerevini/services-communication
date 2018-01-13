function MessageBus(
  host,
  httpClient = require('request'),
  EventSource = require('eventsource')
) {
  const eventSource = new EventSource(`${host}/sub`);

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
    eventSource.onmessage = (message) => {
      if (messageType == message.name)  {
        callback(message);
      }
    };
  }

  return { publish, subscribe }
}

module.exports = MessageBus;

