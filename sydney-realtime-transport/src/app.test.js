import test from 'ava';
import App from './app';

import messageBusFake from './test-helpers/message-bus-fake';
import updaterFake from './test-helpers/updater-fake';
import dateFake from './test-helpers/date-fake';

const setTimeoutFake = (callback) => {
  timeoutCallback = callback;
};

let timeoutCallback = null;

test.beforeEach(() => {
  messageBusFake.reset();
  updaterFake.reset();
  dateFake.reset();

  timeoutCallback = null
});


test('start update when updates for Sydney requested', (t) => {
  t.plan(1);

  updaterFake.onStart = () => {
    t.pass();
  };

  updaterFake.onStop = () => {
    t.fail('should not stop updater');
  };

  const app = new App(messageBusFake, updaterFake, dateFake, setTimeoutFake);
  const message = { name: 'TRANSPORT_LIVE_POSITION_REQUESTED', data: { city: 'AU_Sydney' } }

  messageBusFake.listeners['TRANSPORT_LIVE_POSITION_REQUESTED'](message);
});

test('DO NOT start update when updates for another city requested', (t) => {
  t.plan(0);

  updaterFake.onStart = () => {
    t.fail('should not start updater');
  };

  updaterFake.onStop = () => {
    t.fail('should not stop updater');
  };

  const app = new App(messageBusFake, updaterFake, dateFake, setTimeoutFake);
  const message = { name: 'TRANSPORT_LIVE_POSITION_REQUESTED', data: { city: 'AU_Melbourne' } }

  messageBusFake.listeners['TRANSPORT_LIVE_POSITION_REQUESTED'](message);
});

test('stop updates after 10 minutes without receiving messages', (t) => {
  t.plan(1);

  const TEN_MINUTES_IN_MS = 600000;

  updaterFake.onStop = () => {
    t.pass();
  };

  const app = new App(messageBusFake, updaterFake, dateFake, setTimeoutFake)
  const message = { name: 'TRANSPORT_LIVE_POSITION_REQUESTED', data: { city: 'AU_Sydney' } }
  messageBusFake.listeners['TRANSPORT_LIVE_POSITION_REQUESTED'](message);

  timeoutCallback();
  dateFake.date += TEN_MINUTES_IN_MS + 1;
  timeoutCallback();
});
