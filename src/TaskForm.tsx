"use client";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import type { Task } from "./app/page";

type TaskFormProps = {
  handleAddTask: (task: Task) => void;
};

export function TaskForm({ handleAddTask }: TaskFormProps) {
  const [name, setName] = useState<string>("");
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleAddTask({ name });
    setName("");
  }

  return (
    <div className="flex gap-2">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
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
