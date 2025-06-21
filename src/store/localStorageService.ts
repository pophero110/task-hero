export type Step = {
  description: string;
  created: string; // ISO 8601 format
};

export type Task = {
  id?: string;
  name: string;
  completed?: boolean;
  note: string;
  steps: Step[];
};

export type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

export function success<T>(value: T): Result<T> {
  return { success: true, value };
}

export function failure<T>(error: Error): Result<T> {
  return { success: false, error };
}

export interface StorageService<T> {
  get(key: string): Result<T>;
  set(key: string, value: T): Result<void>;
  getAll(): Result<T[]>;
  remove(key: string): Result<void>;
  clear(): Result<void>;
}

export class LocalStorageService implements StorageService<Task> {
  get(key: string): Result<Task> {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        const task = JSON.parse(item) as Task;
        if (task?.id) return success(task);
        return failure(new Error(`Invalid task data for key ${key}`));
      } catch {
        return failure(new Error(`Invalid JSON for key ${key}`));
      }
    }
    return failure(new Error(`Item with key ${key} not found`));
  }

  set(key: string, value: Task): Result<void> {
    try {
      console.log("Updating task in json: ", JSON.stringify(value));
      localStorage.setItem(key, JSON.stringify(value));
      return success(undefined);
    } catch (error) {
      return failure(error as Error);
    }
  }

  getAll(): Result<Task[]> {
    const tasks: Task[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const result = this.get(key);
        if (result.success) tasks.push(result.value);
      }
      return success(tasks);
    } catch (error) {
      return failure(error as Error);
    }
  }

  remove(key: string): Result<void> {
    try {
      localStorage.removeItem(key);
      return success(undefined);
    } catch (error) {
      return failure(error as Error);
    }
  }

  clear(): Result<void> {
    try {
      localStorage.clear();
      return success(undefined);
    } catch (error) {
      return failure(error as Error);
    }
  }
}

export class TaskService {
  private storageService: StorageService<Task>;
  constructor(storageService: StorageService<Task>) {
    this.storageService = storageService;
  }

  getTaskById(id: string): Result<Task> {
    return this.storageService.get(id);
  }

  addTask(task: Task): Result<Task> {
    const newTask = { ...task, id: `${Math.random() * 100000}` };
    const result = this.storageService.set(newTask.id, newTask);
    if (result.success) {
      return success(newTask);
    }
    console.error("Storage Error: ", result.error);
    return failure(new Error("Something went wrong when adding task"));
  }

  updateTask(task: Task): Result<Task> {
    if (task.id === undefined)
      return failure(new Error("Task ID can not be undefined."));
    const result = this.getTaskById(task.id);
    if (result.success) {
      console.log("Updating task: ", task);
      const result = this.storageService.set(task.id, task);
      if (result.success) {
        return success(task);
      }
    }
    return result;
  }

  deleteTaskById(id: string): Result<void> {
    const result = this.getTaskById(id);
    if (result.success) {
      return this.storageService.remove(id);
    }
    console.error("Storage error: ", result.error);
    return failure(new Error("Something went wrong when deleting task"));
  }

  getAll(): Result<Task[]> {
    const result = this.storageService.getAll();
    if (result.success) {
      return result;
    }
    console.error("Storage error: ", result.error);
    return failure(new Error("Something went wwrong when getting all tasks"));
  }
}
