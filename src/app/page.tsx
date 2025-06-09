"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TaskForm } from "@/task-form";
import TaskTable from "@/task-table";
import TaskView from "@/task-view";
import { useState } from "react";

export type Task = {
  id: string;
  name: string;
  completed: boolean;
  note: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>({
    name: "test",
  });

  const addTask = (task: Task): void => {
    task.id = `${Math.random() * 100000}`;
    setTasks([...tasks, task]);
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={25} className="p-4 h-screen">
        <div className="flex flex-col min-w-min">
          <TaskForm addTask={addTask} />
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
        {selectedTask && <TaskView task={selectedTask} />}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
