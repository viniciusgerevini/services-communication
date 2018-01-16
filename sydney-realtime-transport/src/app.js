const TEN_MINUTES_IN_MS = 600000;

function App(messageBus, updater, date = Date, timeout = setTimeout) {
  let timeSinceLastMessage;

  messageBus.subscribe('TRANSPORT_LIVE_POSITION_REQUESTED', (message) => {
    if (message.data.city === 'AU_Sydney') {
      updater.start();
      timeSinceLastMessage = date.now();
    }
  });

  updater.onUpdate((data) => {
    messageBus.publish({
      name: 'TRANSPORT_LIVE_POSITION_UPDATED',
      data
    });
  });

  timeout(() => {
    if (date.now() - timeSinceLastMessage > TEN_MINUTES_IN_MS) {
      updater.stop();
    }
  });
}

module.exports = App;
