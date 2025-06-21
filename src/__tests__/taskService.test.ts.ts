import {
  Task,
  TaskService,
  Result,
  success,
  LocalStorageService,
} from "../store/localStorageService";

// const mockStorageService = {
//   get: jest.fn<[string], Result<Task>>(),
//   set: jest.fn<[string, Task], Result<void>>(),
//   getAll: jest.fn<[], Result<Task[]>>(),
//   remove: jest.fn<[string], Result<void>>(),
//   clear: jest.fn<[], Result<void>>(),
// };

const localStorageService = new LocalStorageService();
const taskService = new TaskService(localStorageService);
test("get item", () => {
  const task: Task = {
    name: "test",
    completed: false,
    note: "nothing here",
    steps: [],
  };

  // Mock get to return success with task
  // mockStorageService.get.mockReturnValueOnce({ success: true, value: task });

  const newTask = taskService.addTask(task).value;
  const result: Result<Task> = taskService.getTaskById(newTask.id);

  // expect(mockStorageService.get).toHaveBeenCalledWith(task.id);
  expect(result).toEqual(success(newTask));
});

test("update task", () => {
  const task: Task = {
    name: "test1",
    completed: false,
    note: "nothing 2",
    steps: [],
  };

  const savedTask = taskService.addTask(task).value;
  const updatedTask = {
    ...savedTask,
    name: "test2",
    completed: true,
    note: "123",
    steps: [
      ...savedTask.steps,
      {
        description: "123",
        created: new Date().toISOString(),
      },
    ],
  };
  const result: Result<Task> = taskService.updateTask(updatedTask);

  expect(result).toEqual(success(updatedTask));
});
