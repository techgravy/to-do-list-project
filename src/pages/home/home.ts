import { Component } from '@angular/core';

import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { TodoService } from "../../providers/todo/todo";
import { ArchiveTodosPage } from "../archive-todos/archive-todos"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchiveTodosPage;

  constructor(private toastController: ToastController, private todoService: TodoService, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoService.archiveTodo(todoIndex);
  }

  editTodo(todoIndex) {
    this.todoService.editTodo(todoIndex);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchiveTodosPage);
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add A ToDo",
      message: "Enter Your ToDo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add ToDo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoService.addTodo(todoText);

            addTodoAlert.onDidDismiss(()=> {
                let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: "2000"
              });
              addTodoToast.present();
          });

          }
        }
      ]
    });
    addTodoAlert.present();
  }

  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Edit A Todo",
      message: "Edit Your ToDo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit ToDo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoService.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(()=> {
                let editTodoToast = this.toastController.create({
                message: "Todo Edited",
                duration: "2000"
              });
              editTodoToast.present();
          });

          }
        }
      ]
    });
    editTodoAlert.present();
  }
}
