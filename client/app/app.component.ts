import { Component } from '@angular/core';
import {TodosComponent} from './components/todos.component';
import {TodoService} from './services/todo.service';
import {HttpModule} from '@angular/http'; 

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `app.component.html`,
  providers: [TodoService]
})
export class AppComponent  { name = 'Angular'; }