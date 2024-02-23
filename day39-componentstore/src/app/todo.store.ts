import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Todo, TodoSlice } from "./models";
import { DBStore } from "./db.store";

const INIT_STORE: TodoSlice = {
  loadedOn: 0,
  todos: []
}

@Injectable()
export class TodoStore extends ComponentStore<TodoSlice>{
    
    private db = inject(DBStore)

    todos!: Todo[]

    constructor() { 
        super(INIT_STORE) 
        this.db.getAllTodos().then(value => {
            console.info("run me", value)
            this.setState({
              loadedOn: 0,
              todos: value
    })})
    }

    // ngrxOnStoreInit(): void {
    //     console.info("ngoninit")
    //     this.db.getAllTodos().then(value => {
    //         console.info("run me", value)
    //         this.setState({
    //           loadedOn: 0,
    //           todos: value
    // })})
    // }


    // Selectors
    readonly getTodos = this.select<Todo[]>(
        (slice: TodoSlice) => slice.todos
    )

    readonly getNumberOfTodos = this.select<number>(
        (slice: TodoSlice) => slice.todos.length
    )

    readonly getTodoByPriority = (priority: number) => {
        return this.select<Todo[]>(
        (slice: TodoSlice) => {
            return slice.todos.filter(todo => todo.priority == priority)
        }
        )
    }

    // Mutators
    readonly deleteTaskByDate = this.updater<string>(
        (slice: TodoSlice, date: string) => {
            this.db.deleteTodo(date)
            .then(() => {
                return {
                    loadedOn: slice.loadedOn,
                    todos: slice.todos.filter(todo => date != todo.date)
            }})
        //need to return updated slice!!
        return {
            loadedOn: slice.loadedOn,
            todos: slice.todos.filter(todo => date != todo.date)
        }
        }
    )

    readonly addTodo = this.updater<Todo>(
        (slice: TodoSlice, todo: Todo) => {
        /*
        const newTodos: Todo[] = []
        for (let t of slice.todos)
            newTodos.push(t)
        newTodos.push(todo)
        return {
            loadedOn: slice.loadedOn,
            todos: newTodos
        }
        */
        return {
            loadedOn: slice.loadedOn,
            todos: [ ...slice.todos, todo ]
        }
        }
    )

    //adding into indexdb
    //update takes the todo object
    readonly addTask =  this.updater<Todo>(
        //first parameter is slice, second is the object
        (slice: TodoSlice, todo: Todo) => {
            this.db.addTodo(todo)
                .then(() => {
                    return {
                        loadedOn: slice.loadedOn,
                        todos: [ ...slice.todos, todo ]
                    }
                })
            //need to return updated slice!!
            return {
                loadedOn: slice.loadedOn,
                todos: [ ...slice.todos, todo ]
            }
        }
    )

}