//general object
//name is a bound variable
const hello = (name) => {
    return `hello ${name}`
}

const apply = (func, value) => func(value)

//returns a specific object
//takes one argument and returns a function
//difference from the general hello -> name is defined outside scope (global variable)
//closure -> remembers all the free variables in the function
//name is a free variable
const sayHello = (name) => {
    return () => {
        return hello(name)
    }
    //returns a function
}

const helloFred = sayHello('Fred')
const helloBarney = sayHello('Barney')
console.info('helloFred:', helloFred)

//putting a parenthesis () to return value
console.info('helloFred():', helloFred())