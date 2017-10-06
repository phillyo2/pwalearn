import * as firebase from 'firebase';

class FirebaseMessaging {
  constructor(config = {}) {
    config = Object.assign({
      handleMessage: () => {}
    }, config);

    if (firebase.apps.length === 0) {
      FirebaseMessaging.defaultApp = firebase.initializeApp(config);
    }

    this.handleMessage = config.handleMessage;
  }

  requirestPermission() {
    const messaging = firebase.messaging();

    if (this.handleMessage) {
      messaging.onMessage(this.handleMessage);
    }

    return messaging.requestPermission().then(() => messaging.getToken());
  }
}

FirebaseMessaging.defaultApp = undefined;

export default FirebaseMessaging;
