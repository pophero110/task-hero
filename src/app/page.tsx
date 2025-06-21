"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  LocalStorageService,
  Result,
  StorageService,
  success,
  Task,
  TaskService,
} from "@/store/localStorageService";
import { TaskForm } from "@/TaskForm";
import TaskTable from "@/TaskTable";
import TaskEditor from "@/TaskEditor";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const localStorageService: StorageService<Task> = new LocalStorageService();
  const taskService: TaskService = new TaskService(localStorageService);

  const handleAddTask = (task: Task): Result<Task> => {
    const result = taskService.addTask(task);
    if (result.success) {
      setTasks([...tasks, result.value]);
    }
    return result;
  };

  const handleUpdateTask = (task: Task): Result<Task> => {
    const result = taskService.updateTask(task);
    return result;
  };

  useEffect(() => {
    const result = taskService.getAll();
    if (result.success) setTasks(result.value);
  }, []);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={25} className="p-4 h-screen">
        <div className="flex flex-col min-w-min">
          <TaskForm handleAddTask={handleAddTask} />
          <TaskTable
            tasks={tasks}
            onSelectRow={(task) => {
              console.log("Selected task: ", task);
              setSelectedTask(task);
            }}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="p-4 h-screen">
        {selectedTask && (
          <TaskEditor handleUpdateTask={handleUpdateTask} task={selectedTask} />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
