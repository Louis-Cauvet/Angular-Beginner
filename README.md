**Info** : Je me suis arrêté pendant la mise en pratique "Validation & Error", précisément au point "Faites en sorte que si ces règles ne sont pas respectées un message d'erreur
sera affiché pour chacune d'elle" (que j'ai fait).

# Commandes effectuées

## Mise en place du projet
```node -v```  --> affiche "v.20.10.0" 

```npm -v```  --> affiche "v.10.8.3"

```npm install -g @angular/cli```  --> installe le client Angular sur la machine

```ng v``` --> affiche "v.17.3.9"

```ng new task-manager``` --> Initialise un nouveau projet Angular appelé "Task Manager"

```ng serve``` --> Démarre le serveur local du projet, accessible à l'url suivante : http://localhost:4200/

```npm install --global yarn``` --> Ajoute le gestionnaire de package Yarn (équivalent à NPM) au projet

```yarn add --dev @compodoc/compodoc``` --> Ajoute Compodoc, un outil qui permet de générer une documentation statique de l'application, 
en obtenant notamment une visualisation des différents composants et leurs dépendances

## Création d'un composant
```ng generate class model/Task``` --> Créé une classe "Task" dans le dossier "src/app/model"
- Ajouter dans le fichier "task.ts" le contenu suivant :
```
export class Task {
  title!: string;                  // "!" indique que la variable peut être vide à l'instanciation
  description!: string;
  state!: TaskStatus;
}

export enum TaskStatus {
  A_FAIRE = 'A faire',
  EN_COURS = 'En cours',
  TERMINE = 'Terminé'
}
```

- Se placer dans le répertoire "src/app", puis exécuter ```ng g component task``` , qui va générer un dossier 
"task" comportant un fichier HTML, un fichier CSS et les fichiers TS propres au fonctionnement de ce composant.

- Dans le fichier "src/app/task/task.component.ts", ajouter le code suivant :
```
import {Component, OnInit,} from '@angular/core';     // importe la méthode "OnInit" de Angular
import { Task, taskStatus } from '../model/task';

@Component({
  selector: 'app-task',                              // indique la syntaxe permettant d'utiliser ce composant dans le template principal
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',               // précise le template du composant
  styleUrl: './task.component.css'                    // précise la feuille de style du composant
})

export class TaskComponent implements OnInit {
  task!: Task;                                        // implémente une classe "Task" vide au chargement de la page (défini par 'OnInit')

  ngOnInit(): void {                                  // Définit ce qui va ce passer au chargement de la page
    this.task = {                                     // On remplit les données de notre classe "Task"
      title: 'Découvrir Angular',
      description: 'Manipuler un petit peu pour découvrir l\'univers d`\'Angular',
      state: taskStatus.EN_COURS
    };
  }
}
```

- Dans le fichier "src/app/task/task.component.html", définir l'affichage de ce composant :
```
<h1>Bienvuene sur ma première page Angular ! </h1>

<h2>Le titre : {{ task.title }}</h2>
<p>La description : {{ task.description }}</p>
<p>L'état : {{ task.state }}</p>
```

- Dans le fichier "src/app/app.component.html", appeler ce composant de la manière suivante :
```
<app-task></app-task>
```
 
- Vérifier dans "src/app/app.components.ts" que le composant est bien importé dans le template principal :
```
import {TaskComponent} from "./task/task.component";

imports: [RouterOutlet, TaskComponent],
```

- Visualiser à l'url http://localhost:4200/ le résultat 

## Organiser les composants

```ng g component main-task ``` --> créé un nouveau composant "main-task" qui est la partie 'intelligente' 
du composant puisque c'est elle qui va affecter des données aux parties 'idiotes' du composant.

- Modifier le contenu de "src/app/task/task.component.ts" pour qu'il contienne le code suivant :
```
import {Component, OnInit, Input} from '@angular/core';     // On ajoute l'import de 'Input'
import { Task, taskStatus } from '../model/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  @Input() currentTaskComponent!: Task;                     // '@Input' indique qu'il accepte des données en entrée
}
```

- Modifier aussi en conséquence le fichier "src/app/task/task.component.html" :
```
<h1>Bienvenue sur ma première page Angular ! </h1>

<h2>Le titre : {{ currentTaskComponent.title }}</h2>
<p>La description : {{ currentTaskComponent.description }}</p>
<p>L'état : {{ currentTaskComponent.state }}</p>
```

- Nous allons ensuite configurer le composant "Main-task" pour qu'il transmette les données au composant enfant "Task":
```
import { Component, OnInit } from '@angular/core';
import { Task, taskStatus} from '../model/task';           // Récupération de la classe "Task"
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css'],
  standalone: true,
  imports: [TaskComponent]                         // importation du composant enfant
})

export class MainTaskComponent implements OnInit {
  currentTask !: Task
  ngOnInit(): void {                           // C'est ici qu'on définit les données à présent
    this.currentTask = {
      title: 'Découvrir Angular',
      description: 'Manipuler un petit peu pour découvrir l\'univers d`\'Angular',
      state: taskStatus.EN_COURS
    };
  }
}
```

- Dans "src/app/main-task/main-task.component.html", mettre le code suivant :
```
<app-task [currentTaskComponent]="currentTask"></app-task>
```

- Modifier "src/app/app.component.html" pour qu'il appelle à présent le componant 'intelligent':
```
<app-main-task></app-main-task>
```

## Mettre en place des directives

- Créer un nouveau composant "TaskList" avec ```ng generate component task-list```

- Modifier "src/app/main-task/main-task.component.ts" :
```
import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from "../task-list/task-list.component";
import {Task, taskStatus} from "../model/task";
import {TaskList} from "../model/task-list";

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css'],
  standalone: true,
  imports: [TaskListComponent]
})

export class MainTaskComponent implements OnInit {
  currentList !: Task[]
  classTaskList !: TaskList

  ngOnInit(): void {
    this.currentList = [
      { title: 'Tâche entamée 1', description: 'Cette tâche est entamée !', state: taskStatus.EN_COURS },
      { title: 'Tâche achevée 1', description: 'Cette tâche est finie !', state: taskStatus.TERMINE },
      { title: 'Tâche entamée 2', description: 'Cette tâche est aussi entamée !', state: taskStatus.EN_COURS },
      { title: 'Tâche non commencée 1', description: 'Cette tâche est en attente !', state: taskStatus.A_FAIRE },
      { title: 'Tâche achevée 2', description: 'Cette tâche est aussi finie !', state: taskStatus.TERMINE },
      { title: 'Tâche entamée 3', description: 'Cette tâche est également entamée !', state: taskStatus.EN_COURS },
    ]
  }
}
```

- Modifier "src/app/main-task/main-task.component.html" :
```
<app-task-list [currentTaskListComponent]="currentList"></app-task-list>
```

- Dans "src/app/task-list/task-list.component.ts" fraîchement créé, ecrire :
```
import {Component, Input, OnInit} from '@angular/core';
import { TaskList } from '../model/task-list';
import { Task } from '../model/task';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  @Input() currentTaskListComponent!: Task[];
}
```

- Dans "src/app/task-list/task-list.component.html", ecrire :
```
<h1>Ma liste de tâches </h1>

@for (task of currentTaskListComponent; track $index) {
  <app-task [currentTaskComponent]="task"></app-task>
}
```

- Modifier "src/app/task/task.component.ts" :
```
import {Component, OnInit, Input} from '@angular/core';
import { Task, taskStatus } from '../model/task';
import { ColorTaskDirective } from './color-task.directive';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ColorTaskDirective],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  @Input() currentTaskComponent!: Task;
}
```

- Modifier "src/app/task/task.component.html" :
```
<div [colorTask]="currentTaskComponent.state" class="task-item">
  <h2>{{ currentTaskComponent.title }}</h2>
  <p>{{ currentTaskComponent.description }}</p>
  <p>{{ currentTaskComponent.state }}</p>
</div>
```

- Pour génèrer une directive pour gérer la couleur des tâches lors de l'affichage, exécuter ```ng generate directive colorTask```. 
Dans le fichier "src/app/task/color-task.directive.ts" généré, écrire :
```
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { taskStatus } from '../model/task';

@Directive({
  selector: '[colorTask]',
  standalone: true
})

export class ColorTaskDirective implements OnChanges {
  @Input() colorTask!: taskStatus;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.applyColor();
  }

  private applyColor(): void {
    let color: string;

    switch (this.colorTask) {
      case taskStatus.A_FAIRE:
        color = 'red';
        break;
      case taskStatus.EN_COURS:
        color = 'blue';
        break;
      case taskStatus.TERMINE:
        color = 'green';
        break;
      default:
        color = 'white';
    }

    this.el.nativeElement.style.color = color;
  }
}
```

## Mettre en place un pipe

- Dans "src/app/model/task.ts", ajouter une propriété date : 
```
export class Task {
  title!: string;           // "!" indique que la variable peut être vide à l'instanciation
  description!: string;
  state!: taskStatus;
  creationDate!: Date;
}
```

- Dans "src/app/main-task/main-task.component.ts", modifier pour définir des dates aux tâches :
```
ngOnInit(): void {
    this.currentList = [
      { title: 'Tâche entamée 1', description: 'Cette tâche est entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 8) },
      { title: 'Tâche achevée 1', description: 'Cette tâche est finie !', state: taskStatus.TERMINE, creationDate: new Date(2024, 4, 10) },
      { title: 'Tâche entamée 2', description: 'Cette tâche est aussi entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 4) },
      { title: 'Tâche non commencée 1', description: 'Cette tâche est en attente !', state: taskStatus.A_FAIRE, creationDate: new Date(2024, 4, 8) },
      { title: 'Tâche achevée 2', description: 'Cette tâche est aussi finie !', state: taskStatus.TERMINE, creationDate: new Date(2024, 4, 7) },
      { title: 'Tâche entamée 3', description: 'Cette tâche est également entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 9) },
    ]
  }
```

- Générer un pipe avec la commande ```ng generate pipe formatdate```, et écrire dans le fichier "src/app/task/formatdate.pipe.ts" généré :
```
import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'FormatdatePipe',
  standalone: true
})
export class FormatdatePipe implements PipeTransform {
  transform(value: any, format: string = 'dd-MM-yyyy') : any {
    const datePipe = new DatePipe('en-Us')
    return datePipe.transform(value, format);
  }
}
```
**Remarque** : Ne pas oublier d'upload ce pipe dans "src/app/task/task.component.ts":
```
  imports: [ColorTaskDirective, FormatdatePipe],
```

- Dans "src/app/task/task.component.html", ajouter : ```<p>Date de création : {{currentTaskComponent.creationDate | FormatdatePipe }}</p>```

## Mettre en place le routeur

- Dans le fichier "src/app/app.routes.ts" existant déjà, définir les routes dont on a besoin :
``` 
export const routes: Routes = [
  {path: 'tasks', component: MainTaskComponent},
  {path: '', redirectTo: 'tasks', pathMatch: 'full'}
];
```
**Remarque** : Dans "src/app/app.component.html", penser à mettre ```<router-outlet></router-outlet>```

## Création d'un module
- Se déplacer au niveau de "src/app"
- Exécuter ```ng generate module tasks --routing``` pour instancier un nouveau module appelé "tasks" (et son propre système de routage)
- Déplacer tous les dossiers précédemment crées (main-task, model, task, task-list) dans le dossier du module "tasks"
- Retirer tous les ```standalone:true``` et les ```imports``` des composants, de la directive et du pipe
- Dans "src/app/tasks/tasks.module.ts", ajouter les déclarations des composants, de la directive et du pipe : 
```
declarations: [
  TaskComponent, MainTaskComponent, TaskListComponent, ColorTaskDirective, FormatdatePipe
],
```
- Définir dans "src/app/tasks/tasks-routing.module.ts" une route qui pointe vers le composant principal :
```const routes: Routes = [{path: '', component: MainTaskComponent}];```
- Remplacer le code de "src/app/app.routes.ts" pour y mettre :
```
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '',redirectTo: 'display', pathMatch: 'full'},
  {path: 'display', loadChildren: ()=> import('./tasks/tasks.module').then(m => m.TasksModule)}
];
```

## Mise en place d'un service
- Créer un nouveau dossier "services" dans "src/app/tasks" et se placer à son niveau
- Exécuter ```ng generate service CRUDTaskListService``` pour créer un nouveau service "CRUDTaskListService" 
dans ce nouveau dossier
- Dans "src/app/tasks/services/crudtask-list-service.service.ts", ajouter le code suivant qui permet de faire 
un CRUD sur la liste de tâches :
```
import { Injectable } from '@angular/core';
import {Task, taskStatus} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class CRUDTaskListServiceService {
  currentList !: Task[]

  constructor() {
    this.currentList = [
      { title: 'Tâche entamée 1', description: 'Cette tâche est entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 8) },
      { title: 'Tâche achevée 1', description: 'Cette tâche est finie !', state: taskStatus.TERMINE, creationDate: new Date(2024, 4, 10) },
      { title: 'Tâche entamée 2', description: 'Cette tâche est aussi entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 4) },
      { title: 'Tâche non commencée 1', description: 'Cette tâche est en attente !', state: taskStatus.A_FAIRE, creationDate: new Date(2024, 4, 8) },
      { title: 'Tâche achevée 2', description: 'Cette tâche est aussi finie !', state: taskStatus.TERMINE, creationDate: new Date(2024, 4, 7) },
      { title: 'Tâche entamée 3', description: 'Cette tâche est également entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 9) },
    ]
  }

  createTask(task: Task): void {
    this.currentList.push(task);
  }

  getTasks(): Task[] {
    return this.currentList;
  }

  updateTask(updatedTask: Task): void {
    const index = this.currentList.findIndex(task => task.title === updatedTask.title);
    if (index !== -1) {
      this.currentList[index] = updatedTask;
    }
  }

  deleteTask(title: string): void {
    this.currentList = this.currentList.filter(task => task.title !== title);
  }
}
```

- Créer ensuite un nouveau service "ByStatutTaskListService" avec ```ng generate service ByStatutTaskListService```

- Dans "src/app/tasks/services/by-statut-task-list-service.service.ts", ajouter le code :
```
import { Injectable } from '@angular/core';
import {CRUDTaskListServiceService} from "./crudtask-list-service.service";
import { Task, taskStatus } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class ByStatutTaskListServiceService {

  constructor(private crudService: CRUDTaskListServiceService) {}

  getTasksByStatus(status: taskStatus): Task[] {
    return this.crudService.getTasks().filter(task => task.state === status);
  }
}
```

- Modifier ensuite "src/app/tasks/main-task/main-task.component.ts" pour exploiter ces services :
```
import {Component, OnInit} from '@angular/core';
import {Task, taskStatus} from "../model/task";
import {CRUDTaskListServiceService} from "../services/crudtask-list-service.service";
import {ByStatutTaskListServiceService} from "../services/by-statut-task-list-service.service";

@Component({
selector: 'app-main-task',
templateUrl: './main-task.component.html',
styleUrls: ['./main-task.component.css'],
})

export class MainTaskComponent implements OnInit {
  archivedTasks !: Task[]
  CRUDTaskListService !: CRUDTaskListServiceService
  filterStatusService !: ByStatutTaskListServiceService
  
  ngOnInit(): void {
  this.CRUDTaskListService = new CRUDTaskListServiceService()
  this.filterStatusService = new ByStatutTaskListServiceService(this.CRUDTaskListService)
  this.archivedTasks = this.filterStatusService.getTasksByStatus(taskStatus.TERMINE)
  }
}
```

- Créer un nouveau dossier "interfaces" dans "src/app/tasks", puis se placer à son 
niveau et exécuter "ng generate interface CRUDTaskListInterface"

- Dans le fichier d'interface généré, ajouter la déclaration des fonctions du service correspondant :
```
import {Task} from "../model/task";

export interface CRUDTaskListInterface {
  createTask(task: Task): void;
  getTasks(): Task[];
  updateTask(updatedTask: Task): void;
  deleteTask(title: string): void;
}
```

- Indiquer ensuite que le composant utilise cette interface : 
dans "src/app/tasks/services/crudtask-list-service.service.ts" , ajouter ```export class CRUDTaskListServiceService implements CRUDTaskListInterface```

## Utiliser une facade
- Créer un dossier "facade" dans "sec/app/task", se déplacer dedans et exécuter ```ng generate service TaskFacade ```

- Dans "src/app/tasks/facade/task-facade.service.ts", ajouter le code :
```
import { Injectable } from '@angular/core';
import { Task, taskStatus } from '../model/task';
import {CRUDTaskListServiceService} from "../services/crudtask-list-service.service";
import {ByStatutTaskListServiceService} from "../services/by-statut-task-list-service.service";

@Injectable({
  providedIn: 'root'
})
export class TaskFacadeService {

  constructor(
    private crudService: CRUDTaskListServiceService,
    private byStatusService: ByStatutTaskListServiceService
  ) {}

  createTask(task: Task): void {
    this.crudService.createTask(task);
  }

  getAllTasks(): Task[] {
    return this.crudService.getTasks();
  }

  updateTask(task: Task): void {
    this.crudService.updateTask(task);
  }

  deleteTask(title: string): void {
    this.crudService.deleteTask(title);
  }

  getTasksByStatus(status: taskStatus): Task[] {
    return this.byStatusService.getTasksByStatus(status);
  }
}
```

- Dans "src/app/tasks/main-task/main-task.component.ts", modifier le code pour obtenir
```
export class MainTaskComponent implements OnInit {
  archivedTasks!: Task[];

  constructor(private taskFacade: TaskFacadeService) {}

  ngOnInit(): void {
    this.archivedTasks = this.taskFacade.getTasksByStatus(taskStatus.TERMINE);
  }
}
```

- Dans "src/app/tasks/interfaces", créer une nouvelle interface : ```ng generate interface taskFacadeInterface ```
et mettre le code suivant à l'intérieur :
```
import {Task, taskStatus} from "../model/task";

export interface TaskFacadeInterface {
  createTask(task: Task): void;

  getAllTasks(): Task[];

  updateTask(task: Task): void;

  deleteTask(title: string): void;

  getTasksByStatus(status: taskStatus): Task[];
}
```

- Ajouter le fait que "src/app/tasks/facade/task-facade.service.ts" utilise l'interface "src/app/tasks/interfaces/task-facade-interface.ts"

## Ajouter des observables

- Dans le service de facade "src/app/tasks/facade/task-facade.service.ts", modifier 
les fonctions pour qu'elles émettent des observables :
```
createTask(task: Task): Observable<void> {
  this.crudService.createTask(task);
  return of(void 0);
}

getAllTasks(): Observable<Task[]> {
  const allTasks = this.crudService.getTasks();
  return of(allTasks);
}

updateTask(task: Task): Observable<void> {
  this.crudService.updateTask(task);
  return of(void 0);
}

deleteTask(title: string):  Observable<void> {
  this.crudService.deleteTask(title);
  return of(void 0);
}

getTasksByStatus(status: taskStatus): Observable<Task[]> {
  const filterStatusTasks = this.byStatusService.getTasksByStatus(status);
  return of(filterStatusTasks);
}
```

- Puis dans "src/app/tasks/main-task/main-task.component.ts", faire en sorte que le composant souscrive 
aux observables définis qu'il sera amené à utiliser :
```
ngOnInit(): void {
  this.taskFacade.getTasksByStatus(taskStatus.TERMINE).subscribe(filterStatusTasks => {
    this.archivedTasks = filterStatusTasks;
  });
}
```

## Ajout du BehaviourSubject

- Modifier le fichier "src/app/tasks/facade/task-facade.service.ts" pour inclure un BehaviourSubject 
sur les fonctions du service CRUD :
```
import { Injectable } from '@angular/core';
import { Task, taskStatus } from '../model/task';
import {CRUDTaskListServiceService} from "../services/crudtask-list-service.service";
import {ByStatutTaskListServiceService} from "../services/by-statut-task-list-service.service";
import {TaskFacadeInterface} from "../interfaces/task-facade-interface";
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskFacadeService implements TaskFacadeInterface {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.crudService.getTasks());
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(
    private crudService: CRUDTaskListServiceService,
    private byStatusService: ByStatutTaskListServiceService
  ) {}

  createTask(task: Task): Observable<void> {
    this.crudService.createTask(task);
    this.tasksSubject.next(this.crudService.getTasks());
    return of(void 0);
  }

  getAllTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  updateTask(task: Task): Observable<void> {
    this.crudService.updateTask(task);
    this.tasksSubject.next(this.crudService.getTasks());
    return of(void 0);
  }

  deleteTask(title: string): Observable<void> {
    this.crudService.deleteTask(title);
    this.tasksSubject.next(this.crudService.getTasks()); // Mise à jour du BehaviorSubject
    return of(void 0);
  }

  getTasksByStatus(status: taskStatus): Observable<Task[]> {
    const filterStatusTasks = this.byStatusService.getTasksByStatus(status);
    return of(filterStatusTasks);
  }
}
```

- Modifier le code dans "src/app/tasks/main-task/main-task.component.ts":
```
ngOnInit(): void {
  this.taskFacade.getAllTasks().subscribe(tasks => {
  this.archivedTasks = tasks.filter(task => task.state === taskStatus.TERMINE);
  });
}
```

## Ajout d'un Reactive Form

- Se situer au niveau de "src/app" et exécuter ```ng generate module addTaskForm``` pour créer un nouveau module "addTaskForm"

- Se déplacer dans "src/app/add-task-form", et exécuter ```ng generate component task-form```

- Dans "src/app/add-task-form/task-form/task-form.component.ts" : 
```
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Task, taskStatus} from "../../tasks/model/task";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})

export class TaskFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<Task>();
  addTaskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      state:[taskStatus.A_FAIRE, Validators.required],
      creationDate: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      this.formSubmitted.emit(this.addTaskForm.value);
      this.addTaskForm.reset({
        title: '',
        description: '',
        state: taskStatus.A_FAIRE,
        creationDate: new Date()
      });
    }
  }
}
```

- Dans "src/app/add-task-form/task-form/task-form.component.html", définir la structure du formulaire :
```
<section>
  <h1>Formulaire d'ajout de tâche</h1>

  <form [formGroup]="addTaskForm" (ngSubmit)="onSubmit()">
    <div>
      <label for="title">Titre</label>
      <input id="title" type="text" formControlName="title">
    </div>

    <div>
      <label for="description">Description</label>
      <input id="description" type="text" formControlName="description">
    </div>

    <div>
      <button type="submit" [disabled]="!addTaskForm.valid">Valider</button>
    </div>
  </form>
</section>
```

- Exécuter ensuite ```ng generate component main-add-task-form``` pour créer un composant "main-add-task-form"

- Dans "src/app/add-task-form/main-add-task-form/main-add-task-form.component.ts", écrire le code suivant :
```
import { Component } from '@angular/core';
import {TaskFacadeService} from "../../tasks/facade/task-facade.service";
import {Task, taskStatus} from "../../tasks/model/task";

@Component({
  selector: 'app-main-add-task-form',
  templateUrl: './main-add-task-form.component.html',
  styleUrl: './main-add-task-form.component.css'
})

export class MainAddTaskFormComponent {
  constructor(private taskFacade: TaskFacadeService) {}

  onTaskFormSubmit(task: Task): void {
    this.taskFacade.createTask(task).subscribe(() => {
      console.log("La tâche à bien été ajoutée à la liste");
    });
  }
}
```

- Dans "src/app/add-task-form/main-add-task-form/main-add-task-form.component.css", écrire le code suivant :
```
<div>
  <app-task-form (formSubmitted)="onTaskFormSubmit($event)"></app-task-form>
</div>
```

- Dans "src/app/add-task-form/add-task-form.module.ts", ecrire le code suivant :
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskFormComponent} from "./task-form/task-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AddTasksFormRoutingModule} from "./add-task-form-routing.module";
import {MainAddTaskFormComponent} from "./main-add-task-form/main-add-task-form.component";

@NgModule({
  declarations: [TaskFormComponent, MainAddTaskFormComponent],
  imports: [
    CommonModule,ReactiveFormsModule,AddTasksFormRoutingModule
  ]
})

export class AddTaskFormModule {}
```

- Dans "src/app/add-task-form/add-task-form-routing.module.ts", définir la route suivante :
```
const routes: Routes = [{path: '', component: MainAddTaskFormComponent}];
```

- Dans "src/app/app.routes.ts", ne pas oublier de définir la route vers le nouveau module crée :
```
{path: 'add-task', loadChildren: ()=> import('./add-task-form/add-task-form.module').then(m => m.AddTaskFormModule)}
```

## Ajout de règles de validité

- Dans "src/app/add-task-form/task-form/task-form.component.ts", ajouter des règles de validité
sur les données destinées à être récupérées du formulaire :
```
ngOnInit(): void {
  this.addTaskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.minLength(10), Validators.maxLength(200)]],
    state:[taskStatus.A_FAIRE],
    creationDate: [new Date()]
  });
}
```

- Dans "src/app/add-task-form/task-form/task-form.component.html" :
```
<div>
  <label for="title">Titre</label>
  <input id="title" type="text" formControlName="title">
  <div *ngIf="addTaskForm.get('title')?.touched && addTaskForm.get('title')?.invalid">
    <p *ngIf="addTaskForm.get('title')?.errors?.['required']">Le titre est requis.</p>
    <p *ngIf="addTaskForm.get('title')?.errors?.['minlength']">Le titre doit comporter au moins 3 caractères.</p>
    <p *ngIf="addTaskForm.get('title')?.errors?.['maxlength']">Le titre ne doit pas dépasser 50 caractères.</p>
  </div>
</div>

<div>
  <label for="description">Description</label>
  <input id="description" type="text" formControlName="description">
  <div *ngIf="addTaskForm.get('description')?.touched && addTaskForm.get('description')?.invalid">
    <p *ngIf="addTaskForm.get('description')?.errors?.['minlength']">La description doit comporter au moins 3 caractères.</p>
    <p *ngIf="addTaskForm.get('description')?.errors?.['maxlength']">La description ne doit pas dépasser 200 caractères.</p>
  </div>
</div>
```
