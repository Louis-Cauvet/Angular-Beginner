export class Task {
  title!: string;           // "!" indique que la variable peut être vide à l'instanciation
  description!: string;
  state!: taskStatus;
  creationDate!: Date;
}

export enum taskStatus {
  A_FAIRE = 'A faire',
  EN_COURS = 'En cours',
  TERMINE = 'Terminé'
}

