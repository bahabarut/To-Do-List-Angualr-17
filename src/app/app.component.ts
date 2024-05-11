import { TaskModel } from './../Models/TaskModel';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filterPipe } from '../Pipes/filter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgClass, filterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  taskName: string = "";
  saveBtnConfig = { color: "primary", text: "Add New Task", isUpdate: false, updateId: 0 };
  tasks: TaskModel[] = [
    { Id: 1, Name: "task 1", Status: false },
    { Id: 2, Name: "task 2", Status: true },
    { Id: 3, Name: "task 3", Status: false },
  ];
  filterType: string = "all";

  SaveTask() {
    if (!this.saveBtnConfig.isUpdate) {
      //ADD NEW TASK PROCESS
      if (this.taskName.length > 0) {
        var NewTask: TaskModel = { Id: this.tasks.length + 1, Name: this.taskName, Status: false };
        this.tasks.push(NewTask);
      }
    } else {
      //UPDATE TASK PROCESS
      var task: TaskModel | undefined = this.tasks.find(f => f.Id == this.saveBtnConfig.updateId);
      task!.Name = this.taskName;
    }
    this.taskName = "";
    this.UpdateSaveBtnConfig("primary", "Add New Task", false, 0)
  }
  RemoveTask(id: number) {
    var taskIndex: number = this.tasks.findIndex(f => f.Id == id);
    this.tasks.splice(taskIndex, 1);
  }
  UpdateTask(id: number) {
    var task: TaskModel = this.tasks.filter(f => f.Id == id)[0];
    this.UpdateSaveBtnConfig("success", "Update Task", true, id);
    this.taskName = task.Name;
  }
  ChangeTask(task: TaskModel) {
    task.Status = !task.Status;
  }
  DeleteAllTasks() {
    this.tasks.splice(0);
  }
  DeleteDoneTasks() {
    this.tasks = this.tasks.filter(f => !f.Status);
  }
  UpdateSaveBtnConfig(clr: string, text: string, isupd: boolean, updateid: number) {
    this.saveBtnConfig.color = clr;
    this.saveBtnConfig.text = text;
    this.saveBtnConfig.isUpdate = isupd;
    this.saveBtnConfig.updateId = updateid;
  }
}






