import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Todo } from "./models";

const TODO = 'todo'

@Injectable()
export class DBStore extends Dexie {

    private todo!: Dexie.Table<Todo, string>

    constructor() {
        super('todo')
        this.version(1).stores({
            [TODO]: 'date'
        })
        this.todo = this.table(TODO)

    }

    
    addTodo(todos: Todo) : Promise<any> {
        return this.todo.add(todos)
    }


    deleteTodo(date: string) : Promise<any> {
        return this.todo.delete(date)
    }

    getAllTodos(): Promise<Todo[]>{
        return this.todo.toArray()
    }

}