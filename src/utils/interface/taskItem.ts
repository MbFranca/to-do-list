export interface TaskItem {
  id: string;
  value: string;
  favorite: boolean;
  group?: string;
  date?: string;
}

export interface Task {
  id: string;
  value: string;
  favorite: boolean;
  group?: string;
  date?: string;
}
