import {EventEmitter} from "events"

const myEmitter  = new EventEmitter();

function greetHanlder(name){
    console.log('hello world '  + name)
}
function gooDByeHanlder(name){
    console.log('Goodbye world '+  name )
}

myEmitter.on('greet',greetHanlder)
myEmitter.on('goodbye',gooDByeHanlder)

myEmitter.emit('greet',"amir")
myEmitter.emit('goodbye',"amir")

//Simulate Error

// myEmitter.emit('error',new Error('Something went wrong'))