"use client";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { Task } from "./app/page";

type TaskFormProps = {
  addTask: (task: Task) => void;
};

export function TaskForm({ addTask }: TaskFormProps) {
  const [name, setName] = useState<string>("");
  function handleEnter(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    addTask({ name });
    setName("");
  }

  return (
    <div className="flex gap-2">
      <form onSubmit={handleEnter} className="flex gap-2 w-full">
        <Input
          className="w-full"
          id="task"
          type="text"
          autoComplete="off"
          placeholder="Enter task name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </form>
    </div>
  );
}
