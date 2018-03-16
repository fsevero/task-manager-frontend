import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { Task } from "../shared/task.model";
import { TaskService } from "../shared/task.service";

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styles: [
    'form .has-error { background-color: #ffb2c9; }',
    'form .has-success { background-color: #beffaf; }'
  ]
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  public reactiveTaskForm: FormGroup;
  public task: Task;
  public taskDoneOptions: Array<any>;


  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ){
    this.taskDoneOptions = [
      { value: false, text: "Pendente" },
      { value: true, text: "Feita" },
    ];

    this.reactiveTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null, Validators.required],
      description: [null],
    });
  }


  public ngOnInit() {
    this.task = new Task(null, null);

    this.route.params
      .switchMap( (params: Params) => this.taskService.getById(+params['id']) )
      .subscribe(
        (task: Task) => this.setTask(task),
        error => alert("Ocorreu um erro no servidor, tente mais tarde!")
      );
  }


  public setTask(task: Task) {
    this.task = task;
    this.reactiveTaskForm.patchValue(task);
  }


  public ngAfterViewInit() {
    $("#deadline").datetimepicker({
      'sideBySide': true,
      'locale': 'pt-br'
    }).on('dp.change', () => this.getField('deadline').setValue( $("#deadline").val() ) );
  }


  public goBack() {
    this.location.back();
  }


  public updateTask() {
    this.task.title = this.getField('title').value;
    this.task.deadline = this.getField('deadline').value;
    this.task.done = this.getField('done').value;
    this.task.description = this.getField('description').value;

    this.taskService.update(this.task)
      .subscribe(
        () => alert('Tarefa atualizada com sucesso!'),
        () => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
  }


  // form errors methods
  public fieldClass(fieldName: string) {
    return {
      'has-error': this.showFieldError(fieldName),
      'has-success': this.getField(fieldName).valid,
    }
  }


  public showFieldError(fieldName: string): boolean {
    let field = this.getField(fieldName);
    return field.invalid && (field.dirty || field.touched);
  }


  public getField(fieldName: string) {
    return this.reactiveTaskForm.get(fieldName);
  }
}