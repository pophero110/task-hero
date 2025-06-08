"use client";
import { TaskForm } from "@/task-form";
import TaskTable from "@/task-table";
import { useState } from "react";

export type Task = {
  name: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task): void => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="flex flex-col p-8">
      <TaskForm addTask={addTask} />
      <TaskTable tasks={tasks} />
    </div>
  );
}
