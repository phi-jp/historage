

require('regenerator-runtime/runtime');
var EventEmitter = require("events").EventEmitter;

class AsyncEmitter extends EventEmitter {
  emit(event, ...args) {
    var promises = this.listeners(event).map(listener => {
      return listener(...args);
    });

    return Promise.all(promises);
  }
};

module.exports = AsyncEmitter;

// // test

// ;(async () => {
//   var emitter = new AsyncEmitter();

//   emitter.on('click', () => {
//     return 'clicked';
//   });

//   emitter.on('click', async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve('async clicked');
//       }, 1000);
//     });
//   });

//   emitter.on('click', () => {
//     return 'clicked';
//   });
  
//   var results = await emitter.emit('click');
//   console.log(results);
// })();
