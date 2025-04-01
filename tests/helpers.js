export function mockLoggedUserId(userId) {
  if (Meteor.isServer) {
    const originalUserId = Meteor.userId;
    Meteor.userId = () => userId;
    
    // Restaurar después de cada test
    if (typeof afterEach === 'function') {
      afterEach(() => {
        Meteor.userId = originalUserId;
      });
    }
  }
}

export class SubscriptionCollector {
  constructor() {
    this.subscriptions = [];
  }
  
  subscribe(name, ...args) {
    const callbacks = typeof args[args.length - 1] === 'object' ? args.pop() : {};
    const sub = Meteor.subscribe(name, ...args, {
      onReady: () => {
        if (callbacks.onReady) callbacks.onReady();
        this._handleReady();
      },
      onStop: (err) => {
        if (callbacks.onStop) callbacks.onStop(err);
        this._handleStop(err);
      }
    });
    this.subscriptions.push(sub);
    return sub;
  }
  
  _handleReady() {
    // Puedes agregar lógica adicional aquí
  }
  
  _handleStop(err) {
    if (err) console.error('Subscription error:', err);
  }
  
  cleanup() {
    this.subscriptions.forEach(sub => sub.stop());
    this.subscriptions = [];
  }
}

if (typeof afterEach === 'function') {
  afterEach(function() {
    if (this.subCollector) {
      this.subCollector.cleanup();
    }
  });
}