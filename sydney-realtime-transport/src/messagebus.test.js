import test from 'ava';
import MessageBus from './messagebus';

let messageBus = null;
let httpClientStub = null;
const MESSAGE_BUS_HOST = 'http://test.com';

test.beforeEach(() => {
  httpClientStub = {
    post(request) {
      this.lastRequest = request;
    }
  };

  messageBus = new MessageBus(MESSAGE_BUS_HOST, httpClientStub);
});

test('publish message', (t) => {
  const message = {
    name: 'test',
    data: { something: 'here' }
  };

  messageBus.publish(message);

  t.deepEqual(httpClientStub.lastRequest, {
    url: `${MESSAGE_BUS_HOST}/pub`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-EventSource-Event': message.name
    },
    form: message
  });
});
