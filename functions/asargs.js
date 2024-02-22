//functional type
const hello = function(name) {
    return `Hello ${name}`
}

let h = hello

//callbacks -> take in arguments and returns a result
//1. <button type="button" (click)="process($event)">
/*2. prom.then(
 *    function(result) {
      }     
   )
   3.arr.filter, map, forEach
   arr.map(v => { })

   4.thrPool.submit(
      () -> {
         System.out.printf("hello, world\n");
      }
   )
 */
function apply(func,value) {
    return func(value)
}


const name = 'fred'
console.info('hello fred: ', hello(name))


console.info('apply(hello, name):', apply(hello, name))
//this result depends on the previous result -> sequencing
//synchronous way of doing sequencing
//takes output from one and puts it in another
console.info('apply(hello, apply(hello,name)):', apply(hello, apply(hello, name)))

// console.info('apply', apply)
// console.info('hello:', hello)
// console.info('h: ', h)


// console.info('h barney:', h('barney'))