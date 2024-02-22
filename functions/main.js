// scalar type
const name = 'fred'
console.info('name', name)

//reference type
const employee = {
	name: 'fred',
	email: 'fred@gmail.com'
}

console.info('employee', employee)

//functional type
const hello = (name) => {
	return `hello ${name}`
}
console.info('say hello', hello(employee.name))