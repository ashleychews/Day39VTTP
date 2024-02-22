import { Component, OnInit, inject } from '@angular/core';
import { TodoStore } from '../todo.store';
import { Todo } from '../models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit {

  private fb = inject(FormBuilder)
  private todoStore = inject(TodoStore)

  protected form!: FormGroup

  protected taskNum$!: Observable<number>

  ngOnInit(): void {
    this.form = this.fb.group({
    date: this.fb.control<string>(''),
    task: this.fb.control<string>('', [ Validators.required ]),
    priority: this.fb.control<number>(3),
    
    })
    this.taskNum$ = this.todoStore.getNumberOfTodos
  }

  process() {

    const task = this.form.value as Todo

    console.info('>> todo: ', task)
    this.todoStore.addTodo(task)

    this.form.reset()
  }

}
