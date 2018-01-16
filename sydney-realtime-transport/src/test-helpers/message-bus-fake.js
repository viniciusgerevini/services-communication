const messageBusFake = {
  listeners: {},
  lastPublishedMessage: null,
  publish(message) {
    lastPublishedMessage = message;
  },
  subscribe(message, callback) {
    this.listeners[message] = callback;
  },
  reset() {
    this.listeners = {};
    this.lastPublishedMessage = null;
  }
};

module.exports = messageBusFake;
