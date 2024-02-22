const power = (v, r) => {
    let total = 1
    for (let i=0; i<r; i++)
        total *=v
    return total
}

//higher order function
const mkPower = (radix) => {
    //scope of value is defined within the body -> bound
    //scope of radix is not defined within body -> free
    return (value) => {
        return power(value, radix)
    }
}

const square = mkPower(2)
const cube = mkPower(3)
//4 becomes the value
console.info('>square(4)', square(4))

const curry = (func, value) => {
    return function() {
        arguments.func(value, ...arguments)
    }
}