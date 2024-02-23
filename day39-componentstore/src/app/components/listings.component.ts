import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { TodoStore } from '../todo.store';
import { Todo } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent implements OnInit, OnChanges{

  private todoStore = inject(TodoStore)

  protected todos$!: Observable<Todo[]>

  ngOnInit(): void {
    this.todos$ = this.todoStore.getTodos
    // this.todos$ = this.todoStore.getTodoByPriority(3)
    // this.todos$ = this.todoStore.select(
    //   (slice: TodoSlice) => slice.todos
    // )
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.info("ng on changes")
    this.todos$ = this.todoStore.getTodos
  }

  deleteTask(date: string) {
    this.todoStore.deleteTaskByDate(date)
  }

}
