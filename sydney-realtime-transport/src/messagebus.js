function MessageBus(host, httpClient = require('request')) {
  function publish(message) {
    httpClient.post({
      url: `${host}/pub`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-EventSource-Event': message.name
      },
      form: message
    });
  }

  return { publish }
}

module.exports = MessageBus;

