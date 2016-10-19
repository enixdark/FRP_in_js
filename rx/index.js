const Rx = require('rxjs/Rx')
const R = require('ramda')
const fs = require('fs')//.promise
const path = require('path')
// let observable = Rx.Observable.create(function(observer) {
//   observer.onNext('Simon');
//   observer.onNext('Jen');
//   observer.onNext('Sergi');
//   observer.onCompleted(); // We are done
// });


// observable.subscribe(
//   function onNext(x) { console.log('Next: ' + x); },
//   function onError(err) { console.log('Error: ' + err); },
//   function onCompleted() { console.log('Completed'); }
// );
// 
// var observable = Rx.Observable.create(function (observer) {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   setTimeout(() => {
//     observer.next(4);
//     observer.complete();
//   }, 1000);
// });


// console.log('just before subscribe');
// observable.subscribe({
//   next: x => console.log('got value ' + x),
//   error: err => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done'),
// });
// console.log('just after subscribe');

// ================================================

// var source = Rx.Observable.from([1,2,3])
// var subject = new Rx.Subject()

// var multicasted = source.multicast(subject)

// multicasted.subscribe({
//   next: (v) => console.log('A ' + v)
// })

// multicasted.subscribe({
//   next: (v) => console.log('B: ' + v)
// })

// multicasted.connect();
// 
// ================================================
// let source = Rx.Observable.interval(500)

// let subject = new Rx.Subject()

// let multicasted = source.multicast(subject)

// let s1,s2,subscribeConnect;

// s1 = multicasted.subscribe({
//   next: (v) => console.log("Ob A " + v)
// })

// subscribeConnect = multicasted.connect()

// setTimeout( () => {
//   s2 = multicasted.subscribe({
//     next: (v) => console.log("Ob b " + v)
//   })
// }, 600)

// setTimeout( () => {
//   s1.unsubscribe()
// }, 1200)

// setTimeout( () => {
//   s2.unsubscribe()
//   subscribeConnect.unsubscribe()
// }, 2000)


// subject.subscribe({
//   next: (v) => console.log('Ob A ' + v)
// })

// // R.map( x => subject.next(x), [1,2,3,4])
// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);

// subject.subscribe({
//   next: (v) => console.log('Ob B ' + v)
// })

// subject.next(5)

// subject.complete()
// ================================================

// let subject = new Rx.BehaviorSubject(0)

// subject.subscribe({
//   next: (v) => console.log("Ob A " + v)
// })

// subject.next(1);
// subject.next(2);

// subject.subscribe({
//   next: (v) => console.log("Ob B " + v)
// })

// subject.next(5)

// ================================================

// let subject = new Rx.ReplaySubject(3)

// subject.subscribe({
//   next: (v) => console.log('Ob A ' + v)
// })

// R.map( (v) => subject.next(v) , [1,2,3,4])

// subject.subscribe({
//   next: (v) => console.log('Ob B ' + v)
// })

// subject.next(5)

// ================================================

// let subject = new Rx.AsyncSubject()

// subject.subscribe({
//   next: (v) => console.log('Ob A ' + v)
// })

// R.map( (v) => subject.next(v) , [1,2,3,4])

// subject.subscribe({
//   next: (v) => console.log('Ob B ' + v)
// })

// subject.next(5)

// subject.complete()
// 
// ================================================

// const multiplyByTen = (input) => {
//   let output = Rx.Observable.create( (observer) => {
//     input.subscribe({
//       next: v => observer.next(10 * v),
//       error: err => observer.error(err),
//       complete: () => observer.complete()
//     })
//   })

//   return output
// }


// let input = Rx.Observable.from([1,2,3,4])
// let output = multiplyByTen(input)

// output.subscribe( x => console.log(x) )

// ================================================

// let source = Rx.Observable.create( observer => {
//   observer.next(42)
//   observer.complete()

//   return () => console.log('disposed')
// })

// let subscription = source.subscribe(
//   x => console.log('onNext: %s', x),
//   e => console.log('onError: %s', e),
//   () => console.log('onCompleted')
// )

// subscription.unsubscribe()
// 
// ================================================

// let source = Rx.Observable.range(1,5)

// source.subscribe(
//   x => console.log('onNext: %s', x),
//   e => console.log('onError: %s', e),
//   () => console.log('onCompleted')
// )
// ===============================================

// let exists = Rx.Observable.bindCallback(fs.exists)

// let source = exists('file.txt')

// let subscription = source.subscribe(
//   x => console.log('next: %s', x),
//   e => console.log('error: %s', e),
//   () => console.log('completed')
// )

// ===============================================

// let rename = Rx.Observable.bindNodeCallback(fs.rename)

// let source = rename('file.txt', 'file2.txt')

// let subscription = source.subscribe(
//   x => console.log('next: %s', x),
//   e => console.log('error: %s', e),
//   () => console.log('completed')
// )

// ==============================================

// function cb(x) {
//   console.log(x)
// }

// Rx.Observable.prototype.toCallback = cb => {
//   let source = this
//   return () => {
//     let val, hasVal = false;
//     source.subscribe(
//       x => { 
//         hasVal = true 
//         val = x
//       },
//       e => new Error(e),
//       () => hasVal && cb(val)
//     )
//   }
// }

// setTimeout(
//   Rx.Observable.timer(5000)
//     .toCallback(cb)
//   , 500)
//   ==========================================


// let source = Rx.Observable.range(0,3).flatMap(x => Promise.resolve(x * x))

// let subscription = source.subscribe(
//   x => console.log('next: %s', x),
//   e => console.log('error: %s', e),
//   () => console.log('completed')
// )
// =============================================

var source1 = Rx.Observable.range(1, 3);
var source2 = Rx.Observable.range(1, 3);

source1.subscribe( n => console.log("A %s",n), 
                   e => console.log("%s", e),
                   () => console.log("completed") 
)


source2.subscribe( n => console.log("B %s",n), 
                   e => console.log("%s", e),
                   () => console.log("completed") 
)

source1.concat(source2)
       .subscribe(console.log.bind(console));