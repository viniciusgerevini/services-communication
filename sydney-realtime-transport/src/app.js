const TEN_MINUTES_IN_MS = 600000;

function App(messageBus, updater, Date = Date, setTimeout = setTimeout) {
  let timeSinceLastMessage;

  messageBus.subscribe('TRANSPORT_LIVE_POSITION_REQUESTED', (message) => {
    if (message.data.city == 'AU_Sydney') {
      updater.start();
      timeSinceLastMessage = Date.now();
    }
  });

  setTimeout(() => {
    if (Date.now() - timeSinceLastMessage > TEN_MINUTES_IN_MS) {
      updater.stop();
    }
  });
}

module.exports = App;
