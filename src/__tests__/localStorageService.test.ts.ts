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
    id: "123123",
    name: "test",
    completed: false,
    note: "nothing here",
  };

  // Mock get to return success with task
  // mockStorageService.get.mockReturnValueOnce({ success: true, value: task });

  localStorageService.set(task.id, task);
  const result: Result<Task> = taskService.getTaskById(task.id);

  // expect(mockStorageService.get).toHaveBeenCalledWith(task.id);
  expect(result).toEqual(success(task));
});
