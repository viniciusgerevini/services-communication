const config = require('./config').load();
const MessageBus = require('./messagebus');
const app = require('./app');

const messageBus = new MessageBus(config.messageBusHost);
const updater = {
  start() {
  },
  stop() {
  },
  onUpdate(callback) {
    setTimeout(() => {
      callback({ fake: 'data' });
    }, 20000);
  }
};

app(messageBus, updater);
